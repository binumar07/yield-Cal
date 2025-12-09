
import React from 'react';
import { CalculationResult, CropRecord } from '../types';
import { Scale, ShoppingBag, TrendingUp, Save, Plus, X } from 'lucide-react';

interface ResultsDashboardProps {
  currentResult: CalculationResult | null;
  sessionCrops: CropRecord[];
  onAddCrop: () => void;
  onRemoveCrop: (id: string) => void;
  onSaveSession: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  currentResult, 
  sessionCrops, 
  onAddCrop, 
  onRemoveCrop,
  onSaveSession 
}) => {
  const hasSessionData = sessionCrops.length > 0;
  const canAdd = currentResult && currentResult.farmSize > 0;

  return (
    <div className="space-y-4">
      
      {/* Current Estimation Card (Preview) */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-4">
        <h3 className="text-sm font-semibold text-emerald-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Current Estimation
        </h3>
        
        {currentResult && currentResult.farmSize > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {/* Yield */}
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <Scale className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Yield</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-emerald-900">
                  {currentResult.maxKg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </span>
                <span className="text-xs font-medium text-emerald-600">kg</span>
              </div>
            </div>

            {/* Bags */}
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Bags</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-emerald-900">
                  {currentResult.maxBags.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </span>
                <span className="text-xs font-medium text-emerald-600">bags</span>
              </div>
            </div>
            
            {/* Add Button */}
            <div className="col-span-2 mt-1">
              <button
                onClick={onAddCrop}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 py-2 rounded-lg text-sm font-medium transition-colors active:scale-[0.99]"
              >
                <Plus className="w-4 h-4" />
                Add {currentResult.vegetable} to List
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-emerald-400 text-sm italic bg-emerald-50/50 rounded-lg border border-dashed border-emerald-100">
            Enter farm size to estimate
          </div>
        )}
      </div>

      {/* Session List */}
      {hasSessionData && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-4">
          <div className="flex items-center justify-between mb-3">
             <h3 className="text-sm font-semibold text-emerald-900">
               Crops in Record <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full text-xs ml-2">{sessionCrops.length}</span>
             </h3>
          </div>
          
          <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {sessionCrops.map((crop) => (
              <div key={crop.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-sm group">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-8 bg-emerald-400 rounded-full"></div>
                   <div>
                      <div className="font-semibold text-slate-700 capitalize leading-tight">{crop.vegetable}</div>
                      <div className="text-xs text-slate-500 leading-tight mt-0.5">
                        {crop.maxKg.toFixed(0)}kg • {crop.maxBags.toFixed(1)} bags
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => onRemoveCrop(crop.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={onSaveSession}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white hover:bg-slate-700 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-[0.99]"
            >
              <Save className="w-4 h-4" />
              Complete Farmer Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
