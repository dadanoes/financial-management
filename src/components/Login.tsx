import React, { useState } from "react";

interface Props {
  onLogin: (username: string, password: string) => boolean;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      const success = onLogin(formData.username, formData.password);
      if (!success) {
        setError("Username atau password salah!");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-text">$</span>
          </div>
          <h1 className="login-title">Manajemen Keuangan Toko</h1>
          <p className="login-subtitle">Masuk sebagai Administrator</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">👤 Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Masukkan username"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Masukkan password"
              required
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
          )}

          {/* Login Button */}
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? (
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              "🚀 Masuk ke Sistem"
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="help-section">
          <div className="help-card">
            <p className="help-title">💡 Informasi Login:</p>
            <div className="help-credentials">
              <p className="help-item">
                Username: <span className="credential">admin</span>
              </p>
              <p className="help-item">
                Password: <span className="credential">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
