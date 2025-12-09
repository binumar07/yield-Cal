
export interface VegetableData {
  name: string;
  yieldString: string; // e.g., '900kg'
  yieldValue: number;  // e.g., 900
  bagWeight: number;   // e.g., 120
}

export interface CalculationResult {
  vegetable: string;
  farmSize: number;
  maxKg: number;
  maxBags: number;
}

export interface ChartDataPoint {
  name: string;
  yield: number;
}

// Represents a single crop within a farmer's submission
export interface CropRecord extends CalculationResult {
  id: string; // Unique ID for the crop entry within the session
}

// Represents a complete submission for one farmer
export interface FarmerRecord {
  id: string;
  timestamp: number;
  farmerName: string;
  crops: CropRecord[];
}
