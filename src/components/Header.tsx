import React from "react";

interface Props {
  user: string | null;
  level: "admin" | "admintoko" | null;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ user, level, onLogout }) => {
  const getLevelDisplay = () => {
    switch (level) {
      case "admin":
        return {
          text: "Admin Utama",
          icon: "👑",
          color: "text-yellow-800",
          bgColor: "bg-yellow-200",
        };
      case "admintoko":
        return {
          text: "Admin Toko",
          icon: "🏪",
          color: "text-blue-800",
          bgColor: "bg-blue-200",
        };
      default:
        return {
          text: "User",
          icon: "👤",
          color: "text-gray-800",
          bgColor: "bg-gray-200",
        };
    }
  };

  const levelInfo = getLevelDisplay();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-6 relative z-10 gap-4">
          {/* Logo and Title Section */}
          <div className="flex items-center w-full sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                <span className="text-blue-600 text-xl sm:text-3xl font-bold">
                  $
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-2xl font-bold text-white mb-1">
                  Manajemen Keuangan Toko
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm">
                  Sistem Terpusat untuk Multi-Toko
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
            {/* Dashboard Info - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl">📊</div>
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm m-0">
                  Dashboard Keuangan
                </p>
                <p className="text-blue-100 text-xs m-0">
                  Kelola semua toko Anda dalam satu tempat
                </p>
              </div>
            </div>

            {/* User Info and Logout */}
            {user && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-blue-600 font-bold text-sm sm:text-lg">
                      {user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-medium text-xs sm:text-sm m-0">
                      Selamat datang, {user}!
                    </p>
                    <div
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${levelInfo.bgColor} shadow-md border border-white/20`}
                    >
                      <span className="text-sm sm:text-base">
                        {levelInfo.icon}
                      </span>
                      <span className={`font-bold ${levelInfo.color}`}>
                        {levelInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span className="text-sm">🚪</span>
                  <span className="font-medium">Logout</span>
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
