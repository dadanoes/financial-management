import React from "react";
import { FinancialSummary as FinancialSummaryType } from "../types";
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

interface Props {
  summary: FinancialSummaryType;
}

const FinancialSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="space-y-6">
      {/* Konsolidasi Keuangan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BuildingStorefrontIcon className="h-8 w-8 mr-2 text-blue-600" />
          Ringkasan Keuangan Konsolidasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center">
              <ArrowUpIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-600">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold text-green-800">
                  Rp {summary.totalIncome.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center">
              <ArrowDownIcon className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-600">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold text-red-800">
                  Rp {summary.totalExpense.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-600">
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
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Ringkasan Per Toko
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.stores.map((store) => (
            <div
              key={store.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-800 mb-3">{store.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Pemasukan:</span>
                  <span className="font-medium">
                    Rp {store.totalIncome.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Pengeluaran:</span>
                  <span className="font-medium">
                    Rp {store.totalExpense.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Saldo:</span>
                  <span
                    className={`font-bold ${
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
