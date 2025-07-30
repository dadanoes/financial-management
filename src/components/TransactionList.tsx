import React, { useState } from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filterStore, setFilterStore] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );

  const stores = Array.from(new Set(transactions.map((t) => t.storeName)));

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStore =
      filterStore === "" || transaction.storeName === filterStore;
    const matchesType = filterType === "all" || transaction.type === filterType;
    return matchesStore && matchesType;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      onDeleteTransaction(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-purple-600 font-bold">📋</span>
        </div>
        Daftar Transaksi
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            🏪 Filter Toko
          </label>
          <select
            value={filterStore}
            onChange={(e) => setFilterStore(e.target.value)}
            className="form-select"
          >
            <option value="">Semua Toko</option>
            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            📊 Filter Jenis
          </label>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "income" | "expense")
            }
            className="form-select"
          >
            <option value="all">Semua Transaksi</option>
            <option value="income">💰 Pemasukan</option>
            <option value="expense">💸 Pengeluaran</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg font-medium">
              Tidak ada transaksi yang ditemukan
            </p>
            <p className="text-gray-400 text-sm">
              Coba ubah filter atau tambah transaksi baru
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    <span className="text-xl">
                      {transaction.type === "income" ? "📈" : "📉"}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm text-gray-500">🏪</span>
                      <span className="font-bold text-gray-800">
                        {transaction.storeName}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-1">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>📅</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`font-bold text-xl ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} Rp{" "}
                    {transaction.amount.toLocaleString("id-ID")}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                      title="Lihat Detail"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                      title="Hapus Transaksi"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Detail Transaksi
              </h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 mr-3">🏪</span>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Toko
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedTransaction.storeName}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-600 mr-3">📊</span>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Jenis Transaksi
                  </label>
                  <p
                    className={`font-bold ${
                      selectedTransaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type === "income"
                      ? "💰 Pemasukan"
                      : "💸 Pengeluaran"}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-600 mr-3">💰</span>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Jumlah
                  </label>
                  <p
                    className={`text-xl font-bold ${
                      selectedTransaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Rp {selectedTransaction.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 mr-3">📝</span>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Deskripsi
                  </label>
                  <p className="text-gray-800">
                    {selectedTransaction.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 mr-3">📅</span>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Tanggal
                  </label>
                  <p className="text-gray-800">
                    {formatDate(selectedTransaction.date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="btn btn-gray"
              >
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
