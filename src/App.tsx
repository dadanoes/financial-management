import React from "react";
import Header from "./components/Header";
import FinancialSummary from "./components/FinancialSummary";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import LoadingSpinner from "./components/LoadingSpinner";
import SampleDataButton from "./components/SampleDataButton";
import { useFirestore } from "./hooks/useFirestore";

function App() {
  const {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    calculateFinancialSummary,
    getStoreNames,
  } = useFirestore();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const financialSummary = calculateFinancialSummary();
  const storeNames = getStoreNames();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Financial Summary */}
          <FinancialSummary summary={financialSummary} />

          {/* Sample Data Button */}
          {transactions.length === 0 && (
            <SampleDataButton onAddTransactions={handleAddSampleData} />
          )}

          {/* Add Transaction */}
          <AddTransaction
            onAddTransaction={handleAddTransaction}
            stores={storeNames}
          />

          {/* Transaction List */}
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
