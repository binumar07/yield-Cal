import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VEGETABLES } from '../constants';

interface YieldChartProps {
  farmSize: number;
  selectedVegName: string;
}

export const YieldChart: React.FC<YieldChartProps> = ({ farmSize, selectedVegName }) => {
  // Logic: max_kg = (farm_size * vegetable_quantity) / 250
  
  const data = VEGETABLES.map(v => ({
    name: v.name,
    yield: (farmSize * v.yieldValue) / 250,
    isCurrent: v.name === selectedVegName
  })).sort((a, b) => b.yield - a.yield); // Sort by highest yield

  if (farmSize <= 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-emerald-900 mb-6">Yield Comparison (kg)</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis type="number" hide />
            <YAxis 
                type="category" 
                dataKey="name" 
                width={80} 
                tick={{fill: '#064e3b', fontSize: 12, textTransform: 'capitalize'}}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip 
                cursor={{fill: '#ecfdf5'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="yield" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isCurrent ? '#059669' : '#a7f3d0'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-center text-emerald-400 mt-4">
        Comparison of potential yield across all available crops for the same farm size.
      </p>
    </div>
  );
};
