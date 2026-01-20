'use client';
import { useFinanceStore } from '@/store/useFinanceStore';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function Summary() {
  const { transactions } = useFinanceStore();

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const total = income + expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card title="Entradas" value={income} icon={<TrendingUp className="text-emerald-500"/>} color="text-emerald-600"/>
      <Card title="Saídas" value={expense} icon={<TrendingDown className="text-rose-500"/>} color="text-rose-600"/>
      <Card title="Saldo Total" value={total} icon={<Wallet className="text-blue-500"/>} color="text-slate-900"/>
    </div>
  );
}

// Criando uma interface para as Props do Card
interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function Card({ title, value, icon, color }: CardProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h2 className={`text-2xl font-bold ${color}`}>
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
    </div>
  );
}