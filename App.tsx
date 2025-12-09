
import React, { useState, useEffect } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { getVegetableData } from './constants';
import { CalculationResult, FarmerRecord, CropRecord } from './types';
import { Leaf, Info } from 'lucide-react';

const App: React.FC = () => {
  // Data Collection State
  const [farmerName, setFarmerName] = useState<string>('');
  
  // Calculator State
  const [farmSize, setFarmSize] = useState<string>('');
  const [selectedVeg, setSelectedVeg] = useState<string>('onion');
  const [currentResult, setCurrentResult] = useState<CalculationResult | null>(null);
  
  // Session State (Temporary crops for current farmer)
  const [sessionCrops, setSessionCrops] = useState<CropRecord[]>([]);

  // History State
  const [history, setHistory] = useState<FarmerRecord[]>(() => {
    try {
      const saved = localStorage.getItem('agriYieldHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('agriYieldHistory', JSON.stringify(history));
  }, [history]);

  // Core Calculation Logic
  useEffect(() => {
    const size = parseFloat(farmSize);
    const vegData = getVegetableData(selectedVeg);

    if (!isNaN(size) && size > 0 && vegData) {
      const maxKg = (size * vegData.yieldValue) / 250;
      let maxBags = vegData.bagWeight > 0 ? maxKg / vegData.bagWeight : 0;

      // Special requirement: Round watermelon bags to nearest integer
      if (selectedVeg === 'watermelon') {
        maxBags = Math.round(maxBags);
      }

      setCurrentResult({
        vegetable: selectedVeg,
        farmSize: size,
        maxKg,
        maxBags
      });
    } else {
      setCurrentResult(null);
    }
  }, [farmSize, selectedVeg]);

  // Add current calculation to the temporary session list
  const handleAddToSession = () => {
    if (!currentResult) return;
    
    const newCrop: CropRecord = {
        ...currentResult,
        id: crypto.randomUUID()
    };

    setSessionCrops(prev => [newCrop, ...prev]);
  };

  const handleRemoveFromSession = (id: string) => {
    setSessionCrops(prev => prev.filter(c => c.id !== id));
  };

  // Commit the session to history
  const handleSaveSession = () => {
    if (sessionCrops.length === 0) return;

    const newRecord: FarmerRecord = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      farmerName: farmerName.trim(), 
      crops: sessionCrops
    };

    setHistory(prev => [newRecord, ...prev]);
    
    // Reset for next farmer
    setSessionCrops([]);
    setFarmerName('');
    setFarmSize('');
    setCurrentResult(null);
  };

  const clearHistory = () => setHistory([]);
  
  const deleteRecord = (id: string) => {
    setHistory(prev => prev.filter(rec => rec.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-slate-800 pb-20 font-sans">
      {/* Compact Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50 h-14">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-1.5 rounded-lg">
                <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <h1 className="text-lg font-bold text-emerald-900 tracking-tight">AgriYield</h1>
          </div>
          <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <Info className="w-3 h-3 mr-1.5" />
            Data Mode
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              <CalculatorForm 
                farmSize={farmSize} 
                setFarmSize={setFarmSize}
                selectedVeg={selectedVeg}
                setSelectedVeg={setSelectedVeg}
                farmerName={farmerName}
                setFarmerName={setFarmerName}
              />
              
              <div className="text-center text-xs text-emerald-600/60 lg:hidden">
                 Results below
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard & History */}
          <div className="lg:col-span-7 space-y-4">
            <ResultsDashboard 
              currentResult={currentResult} 
              sessionCrops={sessionCrops}
              onAddCrop={handleAddToSession}
              onRemoveCrop={handleRemoveFromSession}
              onSaveSession={handleSaveSession}
            />
            
            <HistoryPanel 
              history={history} 
              onClear={clearHistory} 
              onDelete={deleteRecord} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
