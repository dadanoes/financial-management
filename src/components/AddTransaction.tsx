import React, { useState } from "react";
import { Transaction, Store } from "../types";

interface Props {
  onAddTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => void;
  stores: Store[];
}

const AddTransaction: React.FC<Props> = ({ onAddTransaction, stores }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    amount: "",
    type: "income" as "income" | "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.storeName || !formData.amount || !formData.description) {
      alert("Semua field harus diisi!");
      return;
    }

    const transaction = {
      storeName: formData.storeName,
      amount: parseFloat(formData.amount),
      type: formData.type,
      description: formData.description,
      date: new Date(formData.date),
    };

    onAddTransaction(transaction);

    // Reset form
    setFormData({
      storeName: "",
      amount: "",
      type: "income",
      description: "",
      date: new Date().toISOString().split("T")[0],
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-green-600 font-bold">➕</span>
          </div>
          Tambah Transaksi
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-blue flex items-center"
        >
          <span className="mr-2">{isOpen ? "✕" : "➕"}</span>
          {isOpen ? "Tutup" : "Tambah Transaksi"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🏪 Pilih Toko *
              </label>
              {stores.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Belum ada toko yang ditambahkan. Silakan tambah toko
                    terlebih dahulu di menu "Kelola Toko".
                  </p>
                </div>
              ) : (
                <select
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Pilih Toko</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.name}>
                      {store.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📊 Jenis Transaksi
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="income">💰 Pemasukan</option>
                <option value="expense">💸 Pengeluaran</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                💰 Jumlah (Rp)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="form-input"
                placeholder="0"
                min="0"
                step="1000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📅 Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📝 Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              rows={3}
              placeholder="Masukkan deskripsi transaksi..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-gray"
            >
              ❌ Batal
            </button>
            <button
              type="submit"
              className="btn btn-blue"
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
