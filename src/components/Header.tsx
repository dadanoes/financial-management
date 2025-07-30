import React from "react";

interface Props {
  user: string | null;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-600">$</span>
            </div>
            <div>
              <h1 className="header-title">Manajemen Keuangan Toko</h1>
              <p className="header-subtitle">
                Sistem Terpusat untuk Multi-Toko
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-blue-100 text-sm font-medium">
                Dashboard Keuangan
              </p>
              <p className="text-sm text-blue-200">
                Kelola semua toko Anda dalam satu tempat
              </p>
            </div>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-blue-100 text-sm font-medium">
                    Selamat datang, {user}!
                  </p>
                  <p className="text-xs text-blue-200">Administrator</p>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <span className="mr-2">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
