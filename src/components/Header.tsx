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
          color: "text-yellow-400",
          bgColor: "bg-yellow-100",
        };
      case "admintoko":
        return {
          text: "Admin Toko",
          icon: "🏪",
          color: "text-blue-400",
          bgColor: "bg-blue-100",
        };
      default:
        return {
          text: "User",
          icon: "👤",
          color: "text-gray-400",
          bgColor: "bg-gray-100",
        };
    }
  };

  const levelInfo = getLevelDisplay();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo and Title Section */}
          <div className="header-left">
            <div className="header-logo">
              <div className="logo-icon">
                <span className="logo-text">$</span>
              </div>
              <div className="logo-text-container">
                <h1 className="header-title">Manajemen Keuangan Toko</h1>
                <p className="header-subtitle">
                  Sistem Terpusat untuk Multi-Toko
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="header-right">
            {/* Dashboard Info */}
            <div className="dashboard-info">
              <div className="info-icon">📊</div>
              <div className="info-text">
                <p className="info-title">Dashboard Keuangan</p>
                <p className="info-subtitle">
                  Kelola semua toko Anda dalam satu tempat
                </p>
              </div>
            </div>

            {/* User Info and Logout */}
            {user && (
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    <span className="avatar-text">
                      {user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="user-details">
                    <p className="user-name">Selamat datang, {user}!</p>
                    <div className={`user-level ${levelInfo.bgColor}`}>
                      <span className="level-icon">{levelInfo.icon}</span>
                      <span className={`level-text ${levelInfo.color}`}>
                        {levelInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={onLogout} className="logout-button">
                  <span className="logout-icon">🚪</span>
                  <span className="logout-text">Logout</span>
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
