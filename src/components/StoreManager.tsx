import React, { useState } from "react";

interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
}

interface Props {
  stores: Store[];
  onAddStore: (store: Omit<Store, "id">) => void;
  onDeleteStore: (id: string) => void;
  onEditStore: (id: string, store: Omit<Store, "id">) => void;
}

const StoreManager: React.FC<Props> = ({
  stores,
  onAddStore,
  onDeleteStore,
  onEditStore,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Nama toko harus diisi!");
      return;
    }

    if (isEditing) {
      onEditStore(editingId, formData);
      setIsEditing(false);
      setEditingId("");
    } else {
      onAddStore(formData);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      address: "",
      phone: "",
    });

    setIsOpen(false);
  };

  const handleEdit = (store: Store) => {
    setFormData({
      name: store.name,
      description: store.description,
      address: store.address,
      phone: store.phone,
    });
    setIsEditing(true);
    setEditingId(store.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus toko ini?")) {
      onDeleteStore(id);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsEditing(false);
    setEditingId("");
    setFormData({
      name: "",
      description: "",
      address: "",
      phone: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-orange-600 font-bold">🏪</span>
          </div>
          Kelola Toko
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <span>{isOpen ? "✕" : "➕"}</span>
          {isOpen ? "Tutup" : "Tambah Toko"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-200 shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🏪 Nama Toko *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
                placeholder="Masukkan nama toko"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📞 Nomor Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
                placeholder="081234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📍 Alamat
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm hover:border-gray-400 transition-colors"
              placeholder="Masukkan alamat toko"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📝 Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm hover:border-gray-400 transition-colors resize-none"
              rows={3}
              placeholder="Deskripsi singkat tentang toko"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              ❌ Batal
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {isEditing ? "✏️ Update Toko" : "💾 Simpan Toko"}
            </button>
          </div>
        </form>
      )}

      {/* Store List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-blue-600 text-sm">📋</span>
          </div>
          Daftar Toko ({stores.length})
        </h3>

        {stores.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
            <div className="text-8xl mb-6 text-gray-300">🏪</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Belum ada toko yang ditambahkan
            </h3>
            <p className="text-gray-500 text-sm">
              Klik "Tambah Toko" untuk menambahkan toko pertama
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">🏪</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(store)}
                      className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                      title="Edit Toko"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(store.id)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                      title="Hapus Toko"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-gray-800 text-lg mb-2">
                  {store.name}
                </h4>

                {store.description && (
                  <p className="text-gray-600 text-sm mb-3">
                    {store.description}
                  </p>
                )}

                <div className="space-y-2">
                  {store.address && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📍</span>
                      <span>{store.address}</span>
                    </div>
                  )}

                  {store.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📞</span>
                      <span>{store.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManager;
