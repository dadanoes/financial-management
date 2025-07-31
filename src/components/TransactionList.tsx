import React, { useState, useMemo } from "react";
import { Transaction } from "../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    return (
      new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      new Date(date).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
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

  // Function to download PDF
  const downloadPDF = () => {
    if (filteredAndSortedTransactions.length === 0) {
      alert("Tidak ada data transaksi untuk didownload!");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Laporan Transaksi Keuangan", 14, 22);

    // Add subtitle with filter info
    doc.setFontSize(12);
    let subtitle = "Semua Transaksi";
    if (selectedStore !== "all") subtitle += ` - Toko: ${selectedStore}`;
    if (selectedType !== "all")
      subtitle += ` - Jenis: ${
        selectedType === "income" ? "Pemasukan" : "Pengeluaran"
      }`;
    if (selectedDateFilter !== "all") {
      const dateFilterText = {
        today: "Hari Ini",
        yesterday: "Kemarin",
        thisWeek: "Minggu Ini",
        thisMonth: "Bulan Ini",
      };
      subtitle += ` - Periode: ${
        dateFilterText[selectedDateFilter as keyof typeof dateFilterText]
      }`;
    }
    doc.text(subtitle, 14, 32);

    // Add date generated
    doc.setFontSize(10);
    const now = new Date();
    doc.text(
      `Dibuat pada: ${now.toLocaleDateString("id-ID")} ${now.toLocaleTimeString(
        "id-ID"
      )}`,
      14,
      40
    );

    // Prepare table data
    const tableData = filteredAndSortedTransactions.map((transaction) => [
      new Date(transaction.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
        " " +
        new Date(transaction.date).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      transaction.storeName,
      transaction.type === "income" ? "Pemasukan" : "Pengeluaran",
      formatCurrency(transaction.amount),
      transaction.description.length > 30
        ? transaction.description.substring(0, 30) + "..."
        : transaction.description,
    ]);

    // Add table
    autoTable(doc, {
      head: [["Tanggal & Waktu", "Toko", "Jenis", "Jumlah", "Deskripsi"]],
      body: tableData,
      startY: 50,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 30 }, // Tanggal
        1: { cellWidth: 35 }, // Toko
        2: { cellWidth: 25 }, // Jenis
        3: { cellWidth: 35 }, // Jumlah
        4: { cellWidth: 65 }, // Deskripsi
      },
    });

    // Add summary
    const totalIncome = filteredAndSortedTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredAndSortedTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    const finalY = (doc as any).lastAutoTable.finalY || 50;
    doc.setFontSize(12);
    doc.text("Ringkasan:", 14, finalY + 20);
    doc.setFontSize(10);
    doc.text(
      `Total Pemasukan: ${formatCurrency(totalIncome)}`,
      14,
      finalY + 30
    );
    doc.text(
      `Total Pengeluaran: ${formatCurrency(totalExpense)}`,
      14,
      finalY + 40
    );
    doc.setFontSize(12);
    doc.text(`Saldo: ${formatCurrency(balance)}`, 14, finalY + 50);

    // Generate filename
    let filename = "laporan-transaksi";
    if (selectedStore !== "all") filename += `-${selectedStore}`;
    if (selectedType !== "all") filename += `-${selectedType}`;
    if (selectedDateFilter !== "all") filename += `-${selectedDateFilter}`;
    filename += `-${now.toISOString().split("T")[0]}.pdf`;

    // Download PDF
    doc.save(filename);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          📋 Daftar Transaksi
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Total: {filteredAndSortedTransactions.length} transaksi
        </p>
      </div>

      {/* Download PDF Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between shadow-lg border-2 border-blue-500 gap-4 sm:gap-0">
        <button
          onClick={downloadPDF}
          className="bg-white text-blue-600 border-2 border-blue-600 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base cursor-pointer transition-all duration-200 flex items-center gap-2 sm:gap-3 shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
          disabled={filteredAndSortedTransactions.length === 0}
        >
          📄 Download PDF
        </button>
        <span className="text-white text-sm sm:text-base font-medium max-w-xs text-center sm:text-left">
          Download data transaksi sesuai filter yang dipilih
        </span>
      </div>

      {/* Filters */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 text-center">
          🔍 Filter Transaksi
        </h3>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 w-full sm:min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              🏪 Filter Toko
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="all">Semua Toko</option>
              {storeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full sm:min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              💰 Filter Jenis
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="all">Semua Jenis</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full sm:min-w-48">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              📅 Filter Tanggal
            </label>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
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
      <div className="overflow-x-auto">
        <div className="relative border border-gray-300 rounded-lg">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50">
                  <th
                    className="border border-gray-300 p-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50"
                    onClick={() => handleSort("date")}
                  >
                    Tanggal & Waktu {getSortIcon("date")}
                  </th>
                  <th
                    className="border border-gray-300 p-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50"
                    onClick={() => handleSort("store")}
                  >
                    Toko {getSortIcon("store")}
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700 bg-gray-50">
                    Jenis
                  </th>
                  <th
                    className="border border-gray-300 p-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50"
                    onClick={() => handleSort("amount")}
                  >
                    Jumlah {getSortIcon("amount")}
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700 bg-gray-50">
                    Deskripsi
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700 bg-gray-50">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl text-gray-400">📝</span>
                        <p className="text-gray-600">
                          Tidak ada transaksi yang ditemukan
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border border-gray-300 p-3">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {transaction.storeName}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transaction.type === "income"
                            ? "💰 Pemasukan"
                            : "💸 Pengeluaran"}
                        </span>
                      </td>
                      <td
                        className={`border border-gray-300 p-3 font-semibold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {transaction.description.length > 50
                          ? `${transaction.description.substring(0, 50)}...`
                          : transaction.description}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(transaction)}
                            className="p-2 rounded-lg transition-colors bg-blue-100 text-blue-600 hover:bg-blue-200"
                            title="Lihat Detail"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="p-2 rounded-lg transition-colors bg-red-100 text-red-600 hover:bg-red-200"
                            title="Hapus Transaksi"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <h3 className="text-lg font-bold">Detail Transaksi</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Tanggal */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="text-blue-600 text-xs">📅</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">
                      Tanggal Transaksi
                    </p>
                    <p className="text-gray-900 font-semibold text-sm">
                      {formatDate(selectedTransaction.date)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toko */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🏪</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">
                      Nama Toko
                    </p>
                    <p className="text-gray-900 font-semibold text-sm">
                      {selectedTransaction.storeName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Jenis Transaksi */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      selectedTransaction.type === "income"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        selectedTransaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedTransaction.type === "income" ? "💰" : "💸"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">
                      Jenis Transaksi
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedTransaction.type === "income"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {selectedTransaction.type === "income"
                        ? "💰 Pemasukan"
                        : "💸 Pengeluaran"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Jumlah */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      selectedTransaction.type === "income"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        selectedTransaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      💰
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">
                      Jumlah Transaksi
                    </p>
                    <p
                      className={`text-base font-bold ${
                        selectedTransaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center mt-0.5">
                    <span className="text-orange-600 text-xs">📝</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">
                      Deskripsi Transaksi
                    </p>
                    <p className="text-gray-900 text-sm leading-relaxed">
                      {selectedTransaction.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>✕</span>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
