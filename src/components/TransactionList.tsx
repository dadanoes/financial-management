import React, { useState } from "react";
import { Transaction } from "../types";
import {
  TrashIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

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
      <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Transaksi</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Toko
          </label>
          <select
            value={filterStore}
            onChange={(e) => setFilterStore(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Jenis
          </label>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "income" | "expense")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Transaksi</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Tidak ada transaksi yang ditemukan
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpIcon className="h-5 w-5" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <BuildingStorefrontIcon className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-800">
                        {transaction.storeName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`font-bold text-lg ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} Rp{" "}
                    {transaction.amount.toLocaleString("id-ID")}
                  </span>

                  <div className="flex space-x-1">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Lihat Detail"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Hapus Transaksi"
                    >
                      <TrashIcon className="h-4 w-4" />
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
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Detail Transaksi
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Toko
                </label>
                <p className="text-gray-800">{selectedTransaction.storeName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Jenis Transaksi
                </label>
                <p
                  className={`font-medium ${
                    selectedTransaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedTransaction.type === "income"
                    ? "Pemasukan"
                    : "Pengeluaran"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Jumlah
                </label>
                <p
                  className={`text-lg font-bold ${
                    selectedTransaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Rp {selectedTransaction.amount.toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Deskripsi
                </label>
                <p className="text-gray-800">
                  {selectedTransaction.description}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Tanggal
                </label>
                <p className="text-gray-800">
                  {formatDate(selectedTransaction.date)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Tanggal Dibuat
                </label>
                <p className="text-gray-800">
                  {formatDate(selectedTransaction.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
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
