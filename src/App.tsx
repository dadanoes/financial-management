import React, { useState, useEffect } from "react";
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

  // Add debugging
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  const {
    user,
    loading: authLoading,
    logout,
    isAuthenticated,
    role,
    userStore,
  } = useAuth();

  const {
    transactions,
    stores,
    loading: firestoreLoading,
    deleteTransaction,
    calculateFinancialSummary,
  } = useFirestore();

  // Add debugging
  useEffect(() => {
    console.log("App Debug:", {
      authLoading,
      isAuthenticated,
      firestoreLoading,
      user: user?.email,
      role,
      userStore,
      transactionsCount: transactions?.length,
      storesCount: stores?.length,
    });
  }, [
    authLoading,
    isAuthenticated,
    firestoreLoading,
    user,
    role,
    userStore,
    transactions,
    stores,
  ]);

  const handleLogout = () => {
    logout();
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Gagal menghapus transaksi. Silakan coba lagi.");
    }
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    console.log("Showing auth loading screen");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    console.log("Showing login screen");
    return <Login />;
  }

  // Show loading screen while loading Firestore data
  if (firestoreLoading) {
    console.log("Showing firestore loading screen");
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user?.email || ""}
          level={role || null}
          onLogout={handleLogout}
        />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  console.log("Rendering main app");
  const financialSummary = calculateFinancialSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user?.email || ""}
        level={role || null}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation - Only show for admin utama */}
        {role === "admin" && (
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

        {/* Content based on role and active tab */}
        {role === "admintoko" && (
          <div className="space-y-8">
            <FinancialSummary
              summary={financialSummary}
              level={role || null}
              userStore={userStore}
            />
            {transactions.length === 0 && stores.length > 0 && (
              <SampleDataButton />
            )}
            <AddTransaction
              stores={stores}
              level={role || null}
              userStore={userStore}
            />
            <TransactionHistory
              transactions={transactions}
              userStore={userStore}
            />
          </div>
        )}

        {role === "admin" && (
          <>
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <FinancialSummary summary={financialSummary} level={role} />
                {transactions.length === 0 && stores.length > 0 && (
                  <SampleDataButton />
                )}
                <AddTransaction stores={stores} level={role || null} />
                <TransactionList
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            )}
            {activeTab === "analytics" && (
              <FinancialAnalytics transactions={transactions} />
            )}
            {activeTab === "stores" && <StoreManager stores={stores} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
