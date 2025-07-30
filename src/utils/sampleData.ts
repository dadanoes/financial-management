import { Transaction } from "../types";

export const sampleTransactions: Omit<Transaction, "id" | "createdAt">[] = [
  {
    storeName: "Toko A",
    amount: 5000000,
    type: "income",
    description: "Penjualan produk bulanan",
    date: new Date("2024-01-15"),
  },
  {
    storeName: "Toko A",
    amount: 1500000,
    type: "expense",
    description: "Biaya operasional dan gaji karyawan",
    date: new Date("2024-01-16"),
  },
  {
    storeName: "Toko B",
    amount: 3000000,
    type: "income",
    description: "Penjualan online",
    date: new Date("2024-01-14"),
  },
  {
    storeName: "Toko B",
    amount: 800000,
    type: "expense",
    description: "Biaya marketing dan iklan",
    date: new Date("2024-01-17"),
  },
  {
    storeName: "Toko C",
    amount: 7500000,
    type: "income",
    description: "Penjualan grosir",
    date: new Date("2024-01-13"),
  },
  {
    storeName: "Toko C",
    amount: 2000000,
    type: "expense",
    description: "Pembelian stok barang",
    date: new Date("2024-01-18"),
  },
];

export const sampleStores = ["Toko A", "Toko B", "Toko C"];
