import React, { useState, useEffect } from "react";
import { Transaction, Store } from "../types";

interface Props {
  onAddTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => void;
  stores: Store[];
  level?: "admin" | "admintoko" | null;
  userStore?: string;
}

const AddTransaction: React.FC<Props> = ({
  onAddTransaction,
  stores,
  level = "admin",
  userStore,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    storeName: level === "admintoko" && userStore ? userStore : "",
    amount: "",
    type: "income" as "income" | "expense",
    description: "",
    date: getTodayDate(),
  });

  // Filter stores untuk admin toko (semua toko tersedia)
  const availableStores = stores;

  // Update tanggal setiap kali form dibuka atau komponen di-render
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        date: getTodayDate(),
      }));
    }
  }, [isOpen]);

  // Update tanggal setiap menit untuk memastikan selalu terbaru
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOpen) {
        setFormData((prev) => ({
          ...prev,
          date: getTodayDate(),
        }));
      }
    }, 60000); // Update setiap 1 menit

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.storeName || !formData.amount || !formData.description) {
      alert("Semua field harus diisi!");
      return;
    }

    // Buat tanggal dengan waktu input yang sebenarnya
    const inputDate = new Date(formData.date);
    const now = new Date();
    inputDate.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    const transaction = {
      storeName: formData.storeName,
      amount: parseFloat(formData.amount),
      type: formData.type,
      description: formData.description,
      date: inputDate,
    };

    onAddTransaction(transaction);

    // Reset form
    setFormData({
      storeName: "",
      amount: "",
      type: "income",
      description: "",
      date: getTodayDate(),
    });

    setIsOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <span className="text-green-600 font-bold text-sm sm:text-base">
              ➕
            </span>
          </div>
          Tambah Transaksi
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
        >
          <span>{isOpen ? "✕" : "➕"}</span>
          {isOpen ? "Tutup" : "Tambah Transaksi"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2">
                🏪 Pilih Toko *
              </label>
              {availableStores.length === 0 ? (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 text-lg">⚠️</span>
                    <p className="text-yellow-800 text-sm font-medium">
                      {level === "admintoko"
                        ? "Belum ada toko yang tersedia. Silakan hubungi Admin Utama untuk menambahkan toko."
                        : 'Belum ada toko yang ditambahkan. Silakan tambah toko terlebih dahulu di menu "Kelola Toko".'}
                    </p>
                  </div>
                </div>
              ) : (
                <select
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
                >
                  <option value="">Pilih Toko</option>
                  {availableStores.map((store) => (
                    <option key={store.id} value={store.name}>
                      {store.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2">
                📊 Jenis Transaksi
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
              >
                <option value="income">💰 Pemasukan</option>
                <option value="expense">💸 Pengeluaran</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2">
                💰 Jumlah (Rp)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
                placeholder="0"
                min="0"
                step="1000"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📅 Tanggal
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                  ⚡ Auto Update
                </span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Tanggal akan otomatis terupdate sesuai hari ini
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-2">
              📝 Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm hover:border-gray-400 transition-colors resize-none"
              rows={3}
              placeholder="Masukkan deskripsi transaksi..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
            >
              ❌ Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
              disabled={stores.length === 0}
            >
              💾 Simpan Transaksi
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTransaction;
