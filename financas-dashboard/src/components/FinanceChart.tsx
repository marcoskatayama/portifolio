'use client';
import { useState, useLayoutEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFinanceStore } from '@/store/useFinanceStore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export function FinanceChart() {
  const { transactions } = useFinanceStore();
  const [mounted, setMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Garante que o gráfico só renderize no lado do cliente
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsSmallScreen(window.innerWidth < 640); // sm breakpoint
  }, []);

  const data = transactions.reduce((acc: ChartData[], t) => {
    const found = acc.find(item => item.name === t.category);
    if (found) {
      found.value += Math.abs(t.amount);
    } else {
      acc.push({ name: t.category, value: Math.abs(t.amount) });
    }
    return acc;
  }, []);

  // Enquanto não estiver montado, mostramos um placeholder silencioso com a mesma altura
  if (!mounted) {
    return (
      <div className="min-h-48 w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
        <p className="text-gray-500">Carregando gráfico...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-48">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data.length > 0 ? data : [{ name: 'Sem dados', value: 1 }]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={isSmallScreen ? false : ({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
            outerRadius={isSmallScreen ? "50%" : "60%"}
            fill="#8884d8"
            dataKey="value"
          >
            {data.length > 0 ? data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            )) : <Cell fill="#ccc" />}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

}
