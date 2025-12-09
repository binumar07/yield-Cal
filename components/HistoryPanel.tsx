
import React from 'react';
import { FarmerRecord } from '../types';
import { Download, Trash2, FileText, User, ChevronRight } from 'lucide-react';

interface HistoryPanelProps {
  history: FarmerRecord[];
  onClear: () => void;
  onDelete: (id: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear, onDelete }) => {
  const handleExport = () => {
    if (history.length === 0) return;

    const headers = ['Farmer Name', 'Vegetable', 'Farm Size', 'Yield (kg)', 'Estimated Bags'];
    
    // Flatten the history: one row per crop per farmer
    const rows = history.flatMap(record => {
      return record.crops.map(crop => [
        `"${record.farmerName || 'Unknown'}"`,
        crop.vegetable,
        crop.farmSize,
        crop.maxKg.toFixed(2),
        crop.maxBags.toFixed(2)
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `agri_yield_data_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-emerald-900 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Collected Records ({history.length})
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {history.map((record) => (
          <div key={record.id} className="bg-slate-50/50 rounded-lg border border-emerald-100 overflow-hidden">
            <div className="bg-emerald-50/30 px-3 py-2 flex items-center justify-between border-b border-emerald-100/50">
               <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900">{record.farmerName || 'Unknown Farmer'}</span>
               </div>
               <button
                  onClick={() => onDelete(record.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
               </button>
            </div>
            
            <div className="p-2 space-y-1">
               {record.crops.map((crop) => (
                 <div key={crop.id} className="flex items-center justify-between text-xs px-2 py-1.5 bg-white rounded border border-slate-100">
                    <span className="capitalize font-medium text-slate-700 w-1/3">{crop.vegetable}</span>
                    <div className="flex items-center gap-4 text-slate-600">
                        <span><span className="font-semibold">{crop.maxKg.toFixed(0)}</span> kg</span>
                        <span><span className="font-semibold">{crop.maxBags.toFixed(1)}</span> bags</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-emerald-100 flex justify-center">
        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-red-600 transition-colors"
        >
          Clear History
        </button>
      </div>
    </div>
  );
};
