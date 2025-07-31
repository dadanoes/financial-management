import React, { useState, useMemo, useCallback } from "react";
import { Transaction } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

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
  const [chartType, setChartType] = useState<"bar" | "line" | "doughnut">(
    "bar"
  );

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
  const formatDate = useCallback(
    (dateStr: string) => {
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
          return new Date(
            parseInt(year),
            parseInt(month) - 1
          ).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
        case "yearly":
          return dateStr;
      }
    },
    [selectedPeriod]
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = periodData.map((data) => formatDate(data.date));

    if (chartType === "doughnut") {
      return {
        labels: ["Pemasukan", "Pengeluaran"],
        datasets: [
          {
            data: [totals.income, totals.expense],
            backgroundColor: [
              "rgba(34, 197, 94, 0.8)",
              "rgba(239, 68, 68, 0.8)",
            ],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
            hoverBackgroundColor: [
              "rgba(34, 197, 94, 1)",
              "rgba(239, 68, 68, 1)",
            ],
          },
        ],
      };
    }

    const datasets = [];

    if (selectedType !== "expense") {
      datasets.push({
        label: "Pemasukan",
        data: periodData.map((data) => data.income),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        fill: chartType === "line",
        tension: 0.4,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    if (selectedType !== "income") {
      datasets.push({
        label: "Pengeluaran",
        data: periodData.map((data) => data.expense),
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        fill: chartType === "line",
        tension: 0.4,
        pointBackgroundColor: "rgba(239, 68, 68, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    return {
      labels,
      datasets,
    };
  }, [periodData, selectedType, chartType, totals, formatDate]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${formatCurrency(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    scales:
      chartType !== "doughnut"
        ? {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 11,
                },
                maxRotation: 45,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                font: {
                  size: 11,
                },
                callback: function (value: any) {
                  return formatCurrency(value);
                },
              },
            },
          }
        : undefined,
  };

  // Render chart based on type
  const renderChart = () => {
    if (periodData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl text-gray-400 mb-4">📊</div>
          <p className="text-gray-600 text-center">
            Tidak ada data transaksi untuk periode yang dipilih
          </p>
        </div>
      );
    }

    const chartHeight = chartType === "doughnut" ? "400px" : "500px";

    return (
      <div style={{ height: chartHeight }}>
        {chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
        {chartType === "line" && (
          <Line data={chartData} options={chartOptions} />
        )}
        {chartType === "doughnut" && (
          <Doughnut data={chartData} options={chartOptions} />
        )}
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

          <div className="flex flex-col gap-2 min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              📈 Jenis Grafik
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as any)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="doughnut">Doughnut Chart</option>
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
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
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

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          {renderChart()}
        </div>
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
