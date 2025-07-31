import React from "react";
import { sampleTransactions } from "../utils/sampleData";

interface Props {
  onAddTransactions: (transactions: typeof sampleTransactions) => void;
}

const SampleDataButton: React.FC<Props> = ({ onAddTransactions }) => {
  const handleAddSampleData = async () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menambahkan data sample? Data ini akan membantu Anda melihat bagaimana aplikasi bekerja."
      )
    ) {
      try {
        // Add transactions one by one to simulate real usage
        for (const transaction of sampleTransactions) {
          await onAddTransactions([transaction]);
          // Small delay to avoid overwhelming the database
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        alert("Data sample berhasil ditambahkan!");
      } catch (error) {
        console.error("Error adding sample data:", error);
        alert("Gagal menambahkan data sample. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🎯</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-800">Data Sample</h3>
          <p className="text-blue-700 text-sm">
            Tambah data contoh untuk melihat fitur aplikasi
          </p>
        </div>
      </div>
      <button
        onClick={handleAddSampleData}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <span>📊</span>
        Tambah Data Sample
      </button>
    </div>
  );
};

export default SampleDataButton;
