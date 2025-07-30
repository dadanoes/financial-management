import React from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CurrencyDollarIcon className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold">Manajemen Keuangan Toko</h1>
              <p className="text-blue-100 text-sm">
                Sistem Terpusat untuk Multi-Toko
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-blue-100 text-sm">Dashboard Keuangan</p>
              <p className="text-sm">
                Kelola semua toko Anda dalam satu tempat
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
