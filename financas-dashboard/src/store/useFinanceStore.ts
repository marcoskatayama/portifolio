import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: 'Alimentação' | 'Lazer' | 'Trabalho' | 'Saúde' | 'Outros';
  type: 'income' | 'expense';
  date: string;
};

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
      deleteTransaction: (id) => set((state) => ({ 
        transactions: state.transactions.filter((t) => t.id !== id) 
      })),
    }),
    {
      name: 'financas-storage',
    }
  )
);