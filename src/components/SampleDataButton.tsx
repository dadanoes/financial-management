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
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Sample</h3>
      <p className="text-blue-700 text-sm mb-3">
        Tambahkan data sample untuk melihat bagaimana aplikasi bekerja dengan
        data yang sudah ada.
      </p>
      <button
        onClick={handleAddSampleData}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
      >
        Tambah Data Sample
      </button>
    </div>
  );
};

export default SampleDataButton;
