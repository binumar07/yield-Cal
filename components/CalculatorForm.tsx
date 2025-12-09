
import React from 'react';
import { VEGETABLES } from '../constants';
import { Sprout, Ruler, User } from 'lucide-react';

interface CalculatorFormProps {
  farmSize: string;
  setFarmSize: (val: string) => void;
  selectedVeg: string;
  setSelectedVeg: (val: string) => void;
  farmerName: string;
  setFarmerName: (val: string) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  farmSize,
  setFarmSize,
  selectedVeg,
  setSelectedVeg,
  farmerName,
  setFarmerName,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
      <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
        <Sprout className="w-5 h-5" />
        Data Input
      </h2>
      
      <div className="space-y-4">
        
        {/* Compact Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Farmer Name */}
          <div>
            <label htmlFor="farmerName" className="block text-xs font-semibold text-emerald-800 mb-1 uppercase tracking-wide">
              Farmer Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-emerald-400" />
              </div>
              <input
                type="text"
                id="farmerName"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="Name"
                className="block w-full pl-9 pr-3 py-2 border border-emerald-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-emerald-900 placeholder-emerald-300 outline-none"
              />
            </div>
          </div>

          {/* Farm Size */}
          <div>
            <label htmlFor="farmSize" className="block text-xs font-semibold text-emerald-800 mb-1 uppercase tracking-wide">
              Farm Size (Units)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-4 w-4 text-emerald-400" />
              </div>
              <input
                type="number"
                id="farmSize"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder="Size"
                className="block w-full pl-9 pr-3 py-2 border border-emerald-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-emerald-900 placeholder-emerald-300 outline-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-emerald-50" />

        {/* Compact Vegetable Selector */}
        <div>
          <label className="block text-xs font-semibold text-emerald-800 mb-2 uppercase tracking-wide">
            Select Crop
          </label>
          <div className="grid grid-cols-3 gap-2">
            {VEGETABLES.map((veg) => (
              <button
                key={veg.name}
                onClick={() => setSelectedVeg(veg.name)}
                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-150
                  ${selectedVeg === veg.name 
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-900 ring-1 ring-emerald-500 shadow-sm' 
                    : 'border-emerald-100 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300'
                  }
                `}
              >
                <span className="capitalize font-medium text-xs truncate w-full text-center">{veg.name}</span>
                <span className="text-[10px] text-emerald-400 mt-0.5">{veg.yieldString}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
