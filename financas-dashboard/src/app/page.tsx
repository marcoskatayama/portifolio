'use client';

import dynamic from 'next/dynamic';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Trash2, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const Summary = dynamic(() => import('@/components/Summary').then(mod => mod.Summary), { ssr: false });
const FinanceChart = dynamic(() => import('@/components/FinanceChart').then(mod => mod.FinanceChart), { ssr: false });

export default function FinancePage() {
  const { transactions, addTransaction, deleteTransaction } = useFinanceStore();
  const [desc, setDesc] = useState('');
  const [val, setVal] = useState('');

  const handleAdd = () => {
    if (!desc || !val) return;
    const amount = Number(val);
    
    addTransaction({
      id: Math.random().toString(36),
      description: desc,
      amount: amount,
      type: amount > 0 ? 'income' : 'expense',
      category: 'Outros',
      date: new Date().toLocaleDateString('pt-BR')
    });
    
    setDesc(''); 
    setVal('');
  };

  return (
    <main className="min-h-screen bg-slate-50 p-2 md:p-12">
      <div className="max-w-5xl mx-auto p-2 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard Financeiro</h1>
          <p className="text-slate-500">Controle suas finanças pessoais de forma simples.</p>
        </header>
        <Summary />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-2 md:gap-4">
              <input 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                placeholder="Descrição (ex: Aluguel)" 
                className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700" 
              />
              <input 
                value={val} 
                onChange={e => setVal(e.target.value)} 
                type="number" 
                placeholder="Valor" 
                className="w-20 sm:w-32 p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700" 
              />
              <button 
                onClick={handleAdd} 
                className="bg-blue-600 text-white p-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 md:gap-2 shrink-0"
              >
                <PlusCircle size={18} className="md:w-5 md:h-5" />
                <span className="hidden md:inline font-medium">Adicionar</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-50 bg-slate-50/50 font-semibold text-slate-700">
                Últimas Transações
              </div>
              <div className="divide-y divide-slate-100">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhuma transação registrada ainda.</p>
                    <p className="text-sm text-gray-400 mt-2">Comece adicionando uma acima!</p>
                  </div>
                ) : (
                  transactions.map((t) => (
                    <div key={t.id} className="p-3 md:p-4 flex justify-between items-center hover:bg-slate-50 transition border-b border-gray-100">
                      <div className="flex-1 min-w-0"> 
                        <p className="font-medium truncate">{t.description}</p>
                        <p className="text-sm text-gray-500">{t.category} - {t.date}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className={`font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {t.amount > 0 ? '+' : ''}R$ {Math.abs(t.amount).toFixed(2)}
                        </span>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <FinanceChart />
          </div>
        </div>
      </div>
    </main>
  );
}