import React, { useState, useMemo } from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  userStore?: string;
}

const TransactionHistory: React.FC<Props> = ({ transactions, userStore }) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter transaksi untuk admin toko (semua toko tersedia)
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      // Admin toko dapat melihat semua transaksi dari semua toko

      // Filter berdasarkan jenis transaksi
      if (selectedType !== "all" && transaction.type !== selectedType) {
        return false;
      }

      // Filter berdasarkan tanggal
      if (selectedDateFilter !== "all") {
        const transactionDate = new Date(transaction.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (selectedDateFilter) {
          case "today":
            const transactionToday = new Date(transactionDate);
            transactionToday.setHours(0, 0, 0, 0);
            if (transactionToday.getTime() !== today.getTime()) {
              return false;
            }
            break;
          case "yesterday":
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const transactionYesterday = new Date(transactionDate);
            transactionYesterday.setHours(0, 0, 0, 0);
            if (transactionYesterday.getTime() !== yesterday.getTime()) {
              return false;
            }
            break;
          case "thisWeek":
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            if (transactionDate < startOfWeek) {
              return false;
            }
            break;
          case "thisMonth":
            if (
              transactionDate.getMonth() !== today.getMonth() ||
              transactionDate.getFullYear() !== today.getFullYear()
            ) {
              return false;
            }
            break;
        }
      }

      return true;
    });

    // Sort transaksi
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    transactions,
    userStore,
    selectedType,
    selectedDateFilter,
    sortBy,
    sortOrder,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const handleSort = (field: "date" | "amount") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-header">
        <h2 className="transaction-history-title">📋 Riwayat Transaksi</h2>
        <p className="transaction-history-subtitle">
          Total: {filteredTransactions.length} transaksi
        </p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">💰 Filter Jenis:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">Semua Jenis</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">📅 Filter Tanggal:</label>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Semua Tanggal</option>
              <option value="today">Hari Ini</option>
              <option value="yesterday">Kemarin</option>
              <option value="thisWeek">Minggu Ini</option>
              <option value="thisMonth">Bulan Ini</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th
                className="sortable-header"
                onClick={() => handleSort("date")}
              >
                Tanggal {getSortIcon("date")}
              </th>
              <th>Toko</th>
              <th>Jenis</th>
              <th
                className="sortable-header"
                onClick={() => handleSort("amount")}
              >
                Jumlah {getSortIcon("amount")}
              </th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-message">
                  <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <p>Tidak ada transaksi yang ditemukan</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="transaction-row">
                  <td className="date-cell">{formatDate(transaction.date)}</td>
                  <td className="store-cell">
                    <span className="store-badge">
                      🏪 {transaction.storeName}
                    </span>
                  </td>
                  <td className="type-cell">
                    <span
                      className={`type-badge ${
                        transaction.type === "income" ? "income" : "expense"
                      }`}
                    >
                      {transaction.type === "income"
                        ? "💰 Pemasukan"
                        : "💸 Pengeluaran"}
                    </span>
                  </td>
                  <td
                    className={`amount-cell ${
                      transaction.type === "income" ? "income" : "expense"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="description-cell">
                    {transaction.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
