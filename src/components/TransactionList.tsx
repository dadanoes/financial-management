import React, { useState, useMemo } from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "store">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Get unique store names
  const storeNames = useMemo(() => {
    const names = Array.from(new Set(transactions.map((t) => t.storeName)));
    return names.sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      // Store filter
      if (selectedStore !== "all" && transaction.storeName !== selectedStore) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && transaction.type !== selectedType) {
        return false;
      }

      // Date filter
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

    // Sort transactions
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "store":
          comparison = a.storeName.localeCompare(b.storeName);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    transactions,
    selectedStore,
    selectedType,
    selectedDateFilter,
    sortBy,
    sortOrder,
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      onDeleteTransaction(id);
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

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

  const handleSort = (field: "date" | "amount" | "store") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="transaction-list-container">
      <div className="transaction-list-header">
        <h2 className="transaction-list-title">📋 Daftar Transaksi</h2>
        <p className="transaction-list-subtitle">
          Total: {filteredAndSortedTransactions.length} transaksi
        </p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">🏪 Filter Toko:</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="filter-select"
            >
              <option value="all">Semua Toko</option>
              {storeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

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
              <th
                className="sortable-header"
                onClick={() => handleSort("store")}
              >
                Toko {getSortIcon("store")}
              </th>
              <th>Jenis</th>
              <th
                className="sortable-header"
                onClick={() => handleSort("amount")}
              >
                Jumlah {getSortIcon("amount")}
              </th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-message">
                  <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <p>Tidak ada transaksi yang ditemukan</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="transaction-row">
                  <td className="date-cell">{formatDate(transaction.date)}</td>
                  <td className="store-cell">{transaction.storeName}</td>
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
                    {transaction.description.length > 50
                      ? `${transaction.description.substring(0, 50)}...`
                      : transaction.description}
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="action-button view-button"
                      title="Lihat Detail"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="action-button delete-button"
                      title="Hapus Transaksi"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showModal && selectedTransaction && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Detail Transaksi</h3>
              <button onClick={closeModal} className="modal-close">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Tanggal:</span>
                <span className="detail-value">
                  {formatDate(selectedTransaction.date)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Toko:</span>
                <span className="detail-value">
                  {selectedTransaction.storeName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Jenis:</span>
                <span className="detail-value">
                  <span
                    className={`type-badge ${
                      selectedTransaction.type === "income"
                        ? "income"
                        : "expense"
                    }`}
                  >
                    {selectedTransaction.type === "income"
                      ? "💰 Pemasukan"
                      : "💸 Pengeluaran"}
                  </span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Jumlah:</span>
                <span
                  className={`detail-value ${
                    selectedTransaction.type === "income" ? "income" : "expense"
                  }`}
                >
                  {formatCurrency(selectedTransaction.amount)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Deskripsi:</span>
                <span className="detail-value">
                  {selectedTransaction.description}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="modal-button">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
