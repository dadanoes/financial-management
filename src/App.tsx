import React, { useState } from "react";
import Header from "./components/Header";
import FinancialSummary from "./components/FinancialSummary";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import LoadingSpinner from "./components/LoadingSpinner";
import SampleDataButton from "./components/SampleDataButton";
import StoreManager from "./components/StoreManager";
import Login from "./components/Login";
import { useFirestore } from "./hooks/useFirestore";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "stores">(
    "dashboard"
  );

  const { isAuthenticated, user, login, logout } = useAuth();

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
    return login(username, password);
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
        <Header user={user} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const financialSummary = calculateFinancialSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab("stores")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === "stores"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              🏪 Kelola Toko
            </button>
          </div>
        </div>

        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            {/* Financial Summary */}
            <FinancialSummary summary={financialSummary} />

            {/* Sample Data Button */}
            {transactions.length === 0 && stores.length > 0 && (
              <SampleDataButton onAddTransactions={handleAddSampleData} />
            )}

            {/* Add Transaction */}
            <AddTransaction
              onAddTransaction={handleAddTransaction}
              stores={stores}
            />

            {/* Transaction List */}
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        ) : (
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
      </main>
    </div>
  );
}

export default App;
