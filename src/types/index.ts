export interface Transaction {
  id: string;
  storeName: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: Date;
  createdAt: Date;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  createdAt: Date;
}

export interface StoreSummary {
  id: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  stores: StoreSummary[];
}
