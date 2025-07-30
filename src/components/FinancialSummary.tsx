import React from "react";
import { FinancialSummary as FinancialSummaryType } from "../types";

interface Props {
  summary: FinancialSummaryType;
}

const FinancialSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="space-y-6">
      {/* Konsolidasi Keuangan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold">📊</span>
          </div>
          Ringkasan Keuangan Konsolidasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📈</span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold text-green-800">
                  Rp {summary.totalIncome.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📉</span>
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold text-red-800">
                  Rp {summary.totalExpense.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Saldo Bersih
                </p>
                <p
                  className={`text-2xl font-bold ${
                    summary.balance >= 0 ? "text-blue-800" : "text-red-800"
                  }`}
                >
                  Rp {summary.balance.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ringkasan Per Toko */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-purple-600 text-sm">🏪</span>
          </div>
          Ringkasan Per Toko
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summary.stores.map((store) => (
            <div
              key={store.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">🏪</span>
                </div>
                <h4 className="font-bold text-gray-800 text-lg">
                  {store.name}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Pemasukan:</span>
                  <span className="font-bold text-green-800">
                    Rp {store.totalIncome.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700 font-medium">Pengeluaran:</span>
                  <span className="font-bold text-red-800">
                    Rp {store.totalExpense.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-t-2 border-blue-200">
                  <span className="font-bold text-gray-800">Saldo:</span>
                  <span
                    className={`font-bold text-lg ${
                      store.balance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Rp {store.balance.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
