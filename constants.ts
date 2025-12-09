import { VegetableData } from './types';

// Raw data from the Python script
const VEGETABLE_YIELDS: Record<string, string> = {
  'onion': '900kg',
  'tomato': '1000kg',
  'sweet corn': '750kg',
  'cabbage': '800kg',
  'cucumber': '850kg',
  'lettuce': '350kg',
  'okra': '450kg',
  'hot pepper': '450kg',
  'watermelon': '750kg'
};

const BAG_WEIGHTS: Record<string, number> = {
  'onion': 120,
  'tomato': 26,
  'sweet corn': 80,
  'cabbage': 150,
  'cucumber': 36,
  'lettuce': 10,
  'okra': 75,
  'hot pepper': 100,
  'watermelon': 3.5
};

// Process into a more usable structure
export const VEGETABLES: VegetableData[] = Object.keys(VEGETABLE_YIELDS).map((key) => {
  const yieldStr = VEGETABLE_YIELDS[key];
  // Parse '900kg' -> 900
  const yieldVal = parseFloat(yieldStr.replace('kg', '')) || 0;
  
  return {
    name: key,
    yieldString: yieldStr,
    yieldValue: yieldVal,
    bagWeight: BAG_WEIGHTS[key] || 0
  };
});

// Helper to get specific veg data
export const getVegetableData = (name: string): VegetableData | undefined => {
  return VEGETABLES.find(v => v.name === name);
};