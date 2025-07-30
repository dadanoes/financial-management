import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Transaction, Store, StoreSummary, FinancialSummary } from "../types";

export const useFirestore = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
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

  // Listen to stores changes
  useEffect(() => {
    const q = query(collection(db, "stores"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const storesData: Store[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        storesData.push({
          id: doc.id,
          name: data.name,
          description: data.description || "",
          address: data.address || "",
          phone: data.phone || "",
          createdAt: data.createdAt.toDate(),
        });
      });
      setStores(storesData);
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

  // Add store
  const addStore = async (storeData: Omit<Store, "id" | "createdAt">) => {
    try {
      await addDoc(collection(db, "stores"), {
        ...storeData,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding store:", error);
      throw error;
    }
  };

  // Update store
  const updateStore = async (
    id: string,
    storeData: Omit<Store, "id" | "createdAt">
  ) => {
    try {
      await updateDoc(doc(db, "stores", id), {
        ...storeData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating store:", error);
      throw error;
    }
  };

  // Delete store
  const deleteStore = async (id: string) => {
    try {
      await deleteDoc(doc(db, "stores", id));
    } catch (error) {
      console.error("Error deleting store:", error);
      throw error;
    }
  };

  // Calculate financial summary
  const calculateFinancialSummary = (): FinancialSummary => {
    const storesMap = new Map<string, StoreSummary>();

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
    stores,
    loading,
    addTransaction,
    deleteTransaction,
    addStore,
    updateStore,
    deleteStore,
    calculateFinancialSummary,
    getStoreNames,
  };
};
