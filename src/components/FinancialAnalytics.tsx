import React, { useState, useMemo } from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

const FinancialAnalytics: React.FC<Props> = ({ transactions }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const [selectedType, setSelectedType] = useState<
    "income" | "expense" | "both"
  >("both");

  // Calculate data based on selected period
  const periodData = useMemo(() => {
    if (transactions.length === 0) return [];

    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (selectedPeriod) {
      case "daily":
        // Last 30 days
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case "weekly":
        // Last 12 weeks
        startDate = new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case "monthly":
        // Last 12 months
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        endDate = now;
        break;
      case "yearly":
        // Last 5 years
        startDate = new Date(now.getFullYear() - 5, 0, 1);
        endDate = now;
        break;
    }

    // Filter transactions within date range
    const filteredTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Group transactions by period
    const groupedData = new Map<string, { income: number; expense: number }>();

    filteredTransactions.forEach((transaction) => {
      let key: string;
      const transactionDate = new Date(transaction.date);

      switch (selectedPeriod) {
        case "daily":
          key = transactionDate.toISOString().split("T")[0];
          break;
        case "weekly":
          const weekStart = new Date(transactionDate);
          weekStart.setDate(
            transactionDate.getDate() - transactionDate.getDay()
          );
          key = weekStart.toISOString().split("T")[0];
          break;
        case "monthly":
          key = `${transactionDate.getFullYear()}-${String(
            transactionDate.getMonth() + 1
          ).padStart(2, "0")}`;
          break;
        case "yearly":
          key = transactionDate.getFullYear().toString();
          break;
      }

      const existing = groupedData.get(key) || { income: 0, expense: 0 };
      if (transaction.type === "income") {
        existing.income += transaction.amount;
      } else {
        existing.expense += transaction.amount;
      }
      groupedData.set(key, existing);
    });

    // Convert to array and sort
    return Array.from(groupedData.entries())
      .map(([date, data]) => ({
        date,
        income: data.income,
        expense: data.expense,
        net: data.income - data.expense,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, selectedPeriod]);

  // Calculate totals
  const totals = useMemo(() => {
    return periodData.reduce(
      (acc, data) => ({
        income: acc.income + data.income,
        expense: acc.expense + data.expense,
        net: acc.net + data.net,
      }),
      { income: 0, expense: 0, net: 0 }
    );
  }, [periodData]);

  // Format date for display
  const formatDate = (dateStr: string) => {
    switch (selectedPeriod) {
      case "daily":
        return new Date(dateStr).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        });
      case "weekly":
        const date = new Date(dateStr);
        const endOfWeek = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
        return `${date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        })} - ${endOfWeek.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        })}`;
      case "monthly":
        const [year, month] = dateStr.split("-");
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
          "id-ID",
          { month: "long", year: "numeric" }
        );
      case "yearly":
        return dateStr;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get max value for chart scaling
  const maxValue = Math.max(
    ...periodData.map((d) => Math.max(d.income, d.expense)),
    1
  );

  // Generate chart bars
  const renderChart = () => {
    return (
      <div className="w-full overflow-x-auto">
        <div className="flex items-end justify-between gap-2 min-h-64 p-4">
          {periodData.map((data, index) => (
            <div
              key={data.date}
              className="flex flex-col items-center flex-1 min-w-0"
            >
              <div className="text-xs text-gray-600 mb-2 text-center">
                {formatDate(data.date)}
              </div>
              <div className="flex flex-col gap-1 w-full">
                {selectedType !== "expense" && (
                  <div
                    className="bg-green-500 rounded-t text-white text-xs p-1 text-center min-h-6 flex items-center justify-center"
                    style={{
                      height: `${Math.max(
                        (data.income / maxValue) * 200,
                        24
                      )}px`,
                    }}
                    title={`Pemasukan: ${formatCurrency(data.income)}`}
                  >
                    {data.income > 0 && (
                      <span className="text-xs font-medium">
                        {formatCurrency(data.income)}
                      </span>
                    )}
                  </div>
                )}
                {selectedType !== "income" && (
                  <div
                    className="bg-red-500 rounded-b text-white text-xs p-1 text-center min-h-6 flex items-center justify-center"
                    style={{
                      height: `${Math.max(
                        (data.expense / maxValue) * 200,
                        24
                      )}px`,
                    }}
                    title={`Pengeluaran: ${formatCurrency(data.expense)}`}
                  >
                    {data.expense > 0 && (
                      <span className="text-xs font-medium">
                        {formatCurrency(data.expense)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Analisis Keuangan
        </h2>
        <p className="text-gray-600">
          Laporan pemasukan dan pengeluaran per periode
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          ⚙️ Pengaturan Analisis
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col gap-2 min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              📅 Periode
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="daily">Harian (30 hari terakhir)</option>
              <option value="weekly">Mingguan (12 minggu terakhir)</option>
              <option value="monthly">Bulanan (12 bulan terakhir)</option>
              <option value="yearly">Tahunan (5 tahun terakhir)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              💰 Tipe Data
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="both">Pemasukan & Pengeluaran</option>
              <option value="income">Pemasukan Saja</option>
              <option value="expense">Pengeluaran Saja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
              💰
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Total Pemasukan
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totals.income)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
              💸
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Total Pengeluaran
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totals.expense)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
              📈
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Saldo Bersih
              </h3>
              <p
                className={`text-2xl font-bold ${
                  totals.net >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(totals.net)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Grafik{" "}
          {selectedPeriod === "daily"
            ? "Harian"
            : selectedPeriod === "weekly"
            ? "Mingguan"
            : selectedPeriod === "monthly"
            ? "Bulanan"
            : "Tahunan"}
        </h3>

        {periodData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl text-gray-400 mb-4">📊</div>
            <p className="text-gray-600 text-center">
              Tidak ada data transaksi untuk periode yang dipilih
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            {renderChart()}
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Tabel Data Detail
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Periode
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Pemasukan
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Pengeluaran
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody>
              {periodData.map((data) => (
                <tr key={data.date} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">
                    {formatDate(data.date)}
                  </td>
                  <td className="border border-gray-300 p-3 text-green-600 font-semibold">
                    {formatCurrency(data.income)}
                  </td>
                  <td className="border border-gray-300 p-3 text-red-600 font-semibold">
                    {formatCurrency(data.expense)}
                  </td>
                  <td
                    className={`border border-gray-300 p-3 font-semibold ${
                      data.net >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(data.net)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
