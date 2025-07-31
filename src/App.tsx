import React, { useState } from "react";
import Header from "./components/Header";
import FinancialSummary from "./components/FinancialSummary";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import TransactionHistory from "./components/TransactionHistory";
import LoadingSpinner from "./components/LoadingSpinner";
import SampleDataButton from "./components/SampleDataButton";
import StoreManager from "./components/StoreManager";
import FinancialAnalytics from "./components/FinancialAnalytics";
import Login from "./components/Login";
import { useFirestore } from "./hooks/useFirestore";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "stores" | "analytics"
  >("dashboard");

  const { isAuthenticated, user, level, userStore, login, logout } = useAuth();

  const {
    transactions,
    stores,
    loading,
    addTransaction,
    deleteTransaction,
    addStore,
    updateStore,
    deleteStore,
    calculateFinancialSummary,
  } = useFirestore();

  const handleLogin = (username: string, password: string): boolean => {
    const success = login(username, password);
    return success;
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddTransaction = async (transactionData: any) => {
    try {
      await addTransaction(transactionData);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Gagal menambahkan transaksi. Silakan coba lagi.");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Gagal menghapus transaksi. Silakan coba lagi.");
    }
  };

  const handleAddStore = async (storeData: any) => {
    try {
      await addStore(storeData);
    } catch (error) {
      console.error("Error adding store:", error);
      alert("Gagal menambahkan toko. Silakan coba lagi.");
    }
  };

  const handleUpdateStore = async (id: string, storeData: any) => {
    try {
      await updateStore(id, storeData);
    } catch (error) {
      console.error("Error updating store:", error);
      alert("Gagal mengupdate toko. Silakan coba lagi.");
    }
  };

  const handleDeleteStore = async (id: string) => {
    try {
      await deleteStore(id);
    } catch (error) {
      console.error("Error deleting store:", error);
      alert("Gagal menghapus toko. Silakan coba lagi.");
    }
  };

  const handleAddSampleData = async (transactions: any[]) => {
    try {
      for (const transaction of transactions) {
        await addTransaction(transaction);
      }
    } catch (error) {
      console.error("Error adding sample data:", error);
      throw error;
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} level={level} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const financialSummary = calculateFinancialSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} level={level} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation - Only show for admin utama */}
        {level === "admin" && (
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-white rounded-lg p-2 sm:p-1 shadow-md">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                  activeTab === "dashboard"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                  activeTab === "analytics"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                📈 Analisis
              </button>
              <button
                onClick={() => setActiveTab("stores")}
                className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                  activeTab === "stores"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                🏪 Kelola Toko
              </button>
            </div>
          </div>
        )}

        {/* Admin Toko - Only Dashboard */}
        {level === "admintoko" && (
          <div className="space-y-8">
            {/* Financial Summary */}
            <FinancialSummary
              summary={financialSummary}
              level={level}
              userStore={userStore}
            />

            {/* Sample Data Button */}
            {transactions.length === 0 && stores.length > 0 && (
              <SampleDataButton onAddTransactions={handleAddSampleData} />
            )}

            {/* Add Transaction */}
            <AddTransaction
              onAddTransaction={handleAddTransaction}
              stores={stores}
              level={level}
              userStore={userStore}
            />

            {/* Transaction History - Hanya riwayat transaksi */}
            <TransactionHistory
              transactions={transactions}
              userStore={userStore}
            />

            {/* Access Restricted Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center">
                <span className="text-yellow-600 text-2xl mr-3">🔒</span>
                <div>
                  <h3 className="text-yellow-800 font-bold text-lg">
                    Akses Terbatas
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    Sebagai Admin Toko, Anda hanya dapat menambah transaksi dan
                    melihat ringkasan keuangan toko Anda. Untuk akses penuh,
                    hubungi Admin Utama.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Utama - Full Access */}
        {level === "admin" && (
          <>
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Financial Summary */}
                <FinancialSummary summary={financialSummary} level={level} />

                {/* Sample Data Button */}
                {transactions.length === 0 && stores.length > 0 && (
                  <SampleDataButton onAddTransactions={handleAddSampleData} />
                )}

                {/* Add Transaction */}
                <AddTransaction
                  onAddTransaction={handleAddTransaction}
                  stores={stores}
                  level={level}
                  userStore={userStore}
                />

                {/* Transaction List */}
                <TransactionList
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* Financial Analytics */}
                <FinancialAnalytics transactions={transactions} />
              </div>
            )}

            {activeTab === "stores" && (
              <div className="space-y-8">
                {/* Store Manager */}
                <StoreManager
                  stores={stores}
                  onAddStore={handleAddStore}
                  onDeleteStore={handleDeleteStore}
                  onEditStore={handleUpdateStore}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
