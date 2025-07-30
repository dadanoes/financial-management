import React from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

interface Props {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  storeCount: number;
  transactionCount: number;
}

const Statistics: React.FC<Props> = ({
  totalIncome,
  totalExpense,
  balance,
  storeCount,
  transactionCount,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPercentageChange = () => {
    if (totalExpense === 0) return 100;
    return ((totalIncome - totalExpense) / totalExpense) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Statistik Keuangan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Income */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-600">
                Total Pemasukan
              </p>
              <p className="text-lg font-bold text-green-800">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center">
            <ArrowTrendingDownIcon className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-red-600">
                Total Pengeluaran
              </p>
              <p className="text-lg font-bold text-red-800">
                {formatCurrency(totalExpense)}
              </p>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-600">Saldo Bersih</p>
              <p
                className={`text-lg font-bold ${
                  balance >= 0 ? "text-blue-800" : "text-red-800"
                }`}
              >
                {formatCurrency(balance)}
              </p>
            </div>
          </div>
        </div>

        {/* Store Count */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-purple-600">Jumlah Toko</p>
              <p className="text-lg font-bold text-purple-800">{storeCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-800">{transactionCount}</p>
          <p className="text-sm text-gray-600">Total Transaksi</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p
            className={`text-2xl font-bold ${
              getPercentageChange() >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {getPercentageChange().toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Perubahan Saldo</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-800">
            {totalIncome > 0
              ? ((totalExpense / totalIncome) * 100).toFixed(1)
              : 0}
            %
          </p>
          <p className="text-sm text-gray-600">Rasio Pengeluaran</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
