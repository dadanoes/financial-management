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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-orange-600 font-bold">🏪</span>
          </div>
          Kelola Toko
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-blue flex items-center"
        >
          <span className="mr-2">{isOpen ? "✕" : "➕"}</span>
          {isOpen ? "Tutup" : "Tambah Toko"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-200 mb-6"
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
                className="form-input"
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
                className="form-input"
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
              className="form-input"
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
              className="form-textarea"
              rows={3}
              placeholder="Deskripsi singkat tentang toko"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-gray"
            >
              ❌ Batal
            </button>
            <button type="submit" className="btn btn-blue">
              {isEditing ? "✏️ Update Toko" : "💾 Simpan Toko"}
            </button>
          </div>
        </form>
      )}

      {/* Store List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Daftar Toko ({stores.length})
        </h3>

        {stores.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-gray-500 text-lg font-medium">
              Belum ada toko yang ditambahkan
            </p>
            <p className="text-gray-400 text-sm">
              Klik "Tambah Toko" untuk menambahkan toko pertama
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🏪</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(store)}
                      className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                      title="Edit Toko"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(store.id)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
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
