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
      <div className="chart-container">
        <div className="chart-bars">
          {periodData.map((data, index) => (
            <div key={data.date} className="chart-bar-group">
              <div className="chart-bar-label">{formatDate(data.date)}</div>
              <div className="chart-bars-container">
                {selectedType !== "expense" && (
                  <div
                    className="chart-bar income-bar"
                    style={{
                      height: `${(data.income / maxValue) * 100}%`,
                      backgroundColor: "#10b981",
                    }}
                    title={`Pemasukan: ${formatCurrency(data.income)}`}
                  >
                    <span className="bar-value">
                      {formatCurrency(data.income)}
                    </span>
                  </div>
                )}
                {selectedType !== "income" && (
                  <div
                    className="chart-bar expense-bar"
                    style={{
                      height: `${(data.expense / maxValue) * 100}%`,
                      backgroundColor: "#ef4444",
                    }}
                    title={`Pengeluaran: ${formatCurrency(data.expense)}`}
                  >
                    <span className="bar-value">
                      {formatCurrency(data.expense)}
                    </span>
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
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <h2 className="analytics-title">📊 Analisis Keuangan</h2>
        <p className="analytics-subtitle">
          Laporan pemasukan dan pengeluaran per periode
        </p>
      </div>

      {/* Controls */}
      <div className="analytics-controls">
        <div className="control-group">
          <label className="control-label">📅 Periode:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="control-select"
          >
            <option value="daily">Harian (30 hari terakhir)</option>
            <option value="weekly">Mingguan (12 minggu terakhir)</option>
            <option value="monthly">Bulanan (12 bulan terakhir)</option>
            <option value="yearly">Tahunan (5 tahun terakhir)</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">💰 Tipe Data:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="control-select"
          >
            <option value="both">Pemasukan & Pengeluaran</option>
            <option value="income">Pemasukan Saja</option>
            <option value="expense">Pengeluaran Saja</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income-card">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3 className="card-title">Total Pemasukan</h3>
            <p className="card-value">{formatCurrency(totals.income)}</p>
          </div>
        </div>

        <div className="summary-card expense-card">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3 className="card-title">Total Pengeluaran</h3>
            <p className="card-value">{formatCurrency(totals.expense)}</p>
          </div>
        </div>

        <div className="summary-card net-card">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3 className="card-title">Saldo Bersih</h3>
            <p
              className={`card-value ${
                totals.net >= 0 ? "positive" : "negative"
              }`}
            >
              {formatCurrency(totals.net)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <h3 className="chart-title">
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
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p className="empty-text">
              Tidak ada data transaksi untuk periode yang dipilih
            </p>
          </div>
        ) : (
          <div className="chart-wrapper">{renderChart()}</div>
        )}
      </div>

      {/* Data Table */}
      <div className="data-table-section">
        <h3 className="table-title">Tabel Data Detail</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Periode</th>
                <th>Pemasukan</th>
                <th>Pengeluaran</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {periodData.map((data) => (
                <tr key={data.date}>
                  <td>{formatDate(data.date)}</td>
                  <td className="income-cell">{formatCurrency(data.income)}</td>
                  <td className="expense-cell">
                    {formatCurrency(data.expense)}
                  </td>
                  <td
                    className={`net-cell ${
                      data.net >= 0 ? "positive" : "negative"
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
