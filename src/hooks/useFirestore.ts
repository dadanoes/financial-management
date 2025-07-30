import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Transaction, Store, FinancialSummary } from "../types";

export const useFirestore = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to transactions changes
  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionsData.push({
          id: doc.id,
          storeName: data.storeName,
          amount: data.amount,
          type: data.type,
          description: data.description,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
        });
      });
      setTransactions(transactionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add transaction
  const addTransaction = async (
    transactionData: Omit<Transaction, "id" | "createdAt">
  ) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...transactionData,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  // Calculate financial summary
  const calculateFinancialSummary = (): FinancialSummary => {
    const storesMap = new Map<string, Store>();

    transactions.forEach((transaction) => {
      const storeName = transaction.storeName;

      if (!storesMap.has(storeName)) {
        storesMap.set(storeName, {
          id: storeName,
          name: storeName,
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        });
      }

      const store = storesMap.get(storeName)!;

      if (transaction.type === "income") {
        store.totalIncome += transaction.amount;
      } else {
        store.totalExpense += transaction.amount;
      }

      store.balance = store.totalIncome - store.totalExpense;
    });

    const stores = Array.from(storesMap.values());
    const totalIncome = stores.reduce(
      (sum, store) => sum + store.totalIncome,
      0
    );
    const totalExpense = stores.reduce(
      (sum, store) => sum + store.totalExpense,
      0
    );
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
      stores,
    };
  };

  // Get unique store names
  const getStoreNames = (): string[] => {
    return Array.from(new Set(transactions.map((t) => t.storeName)));
  };

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    calculateFinancialSummary,
    getStoreNames,
  };
};
