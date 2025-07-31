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
  }, [transactions, selectedType, selectedDateFilter, sortBy, sortOrder]);

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

  const handleSort = (field: "date" | "amount") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📋 Riwayat Transaksi
        </h2>
        <p className="text-gray-600">
          Total: {filteredTransactions.length} transaksi
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 text-center">
          🔍 Filter Transaksi
        </h3>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
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
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700 bg-gray-50">
                    Toko
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
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl text-gray-400">📝</span>
                        <p className="text-gray-600">
                          Tidak ada transaksi yang ditemukan
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border border-gray-300 p-3">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          🏪 {transaction.storeName}
                        </span>
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
                        {transaction.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
