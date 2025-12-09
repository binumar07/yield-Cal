import React, { useState, useEffect } from 'react';
import { CalculationResult } from '../types';
import { getAgronomicAdvice } from '../services/geminiService';
import { Sparkles, Bot, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorProps {
  result: CalculationResult | null;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ result }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear advice when inputs change drastically
  useEffect(() => {
    setAdvice(null);
    setError(null);
  }, [result?.vegetable, result?.farmSize]);

  const handleAskAi = async () => {
    if (!result) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAgronomicAdvice(
        result.vegetable,
        result.farmSize,
        result.maxKg,
        result.maxBags
      );
      setAdvice(response);
    } catch (err) {
      setError("Something went wrong while contacting the AI.");
    } finally {
      setLoading(false);
    }
  };

  if (!result || result.farmSize <= 0) return null;

  return (
    <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600">
                <Bot className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-emerald-900">AI Agronomist</h3>
                <p className="text-sm text-emerald-600">Powered by Gemini 2.5 Flash</p>
            </div>
        </div>
        
        {!advice && !loading && (
            <button
            onClick={handleAskAi}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
            >
            <Sparkles className="w-4 h-4" />
            Generate Farming Tips
            </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-emerald-600 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p>Analyzing soil data and crop requirements...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
        </div>
      )}

      {advice && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 prose prose-emerald max-w-none">
           <ReactMarkdown>{advice}</ReactMarkdown>
           <div className="mt-6 flex justify-end">
             <button 
                onClick={handleAskAi}
                className="text-sm text-emerald-500 hover:text-emerald-700 font-medium underline decoration-dotted"
             >
                Regenerate Advice
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
