import React, { useState } from "react";
import { sampleTransactions } from "../utils/sampleData";
import { useFirestore } from "../hooks/useFirestore";

const SampleDataButton: React.FC = () => {
  const { addTransaction } = useFirestore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSampleData = async () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menambahkan data sample? Data ini akan membantu Anda melihat bagaimana aplikasi bekerja."
      )
    ) {
      setIsLoading(true);
      try {
        // Add transactions one by one to simulate real usage
        for (const transaction of sampleTransactions) {
          await addTransaction(transaction);
          // Small delay to avoid overwhelming the database
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        alert("Data sample berhasil ditambahkan!");
      } catch (error) {
        console.error("Error adding sample data:", error);
        alert("Gagal menambahkan data sample. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
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
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Menambahkan...
          </>
        ) : (
          <>
            <span>📊</span>
            Tambah Data Sample
          </>
        )}
      </button>
    </div>
  );
};

export default SampleDataButton;
