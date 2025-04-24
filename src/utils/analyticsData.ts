export interface WasteDataPoint {
  day: string;
  metal: number;
  paper: number;
}

export interface CollectionDataPoint {
  month: string;
  collections: number;
}

export const dailyWasteData: WasteDataPoint[] = [
  { day: "Mon", metal: 2.1, paper: 3.5 },
  { day: "Tue", metal: 4.3, paper: 2.9 },
  { day: "Wed", metal: 3.2, paper: 4.2 },
  { day: "Thu", metal: 5.4, paper: 3.1 },
  { day: "Fri", metal: 2.8, paper: 5.4 },
  { day: "Sat", metal: 1.9, paper: 2.8 },
  { day: "Sun", metal: 1.5, paper: 2.3 },
];

export const weeklyWasteData: WasteDataPoint[] = [
  { day: "Week 1", metal: 18.5, paper: 22.7 },
  { day: "Week 2", metal: 17.2, paper: 20.8 },
  { day: "Week 3", metal: 19.4, paper: 24.3 },
  { day: "Week 4", metal: 20.8, paper: 21.9 },
];

export const monthlyWasteData: WasteDataPoint[] = [
  { day: "Jan", metal: 76.2, paper: 89.7 },
  { day: "Feb", metal: 70.5, paper: 82.3 },
  { day: "Mar", metal: 79.4, paper: 91.2 },
  { day: "Apr", metal: 74.8, paper: 88.5 },
  { day: "May", metal: 83.1, paper: 93.7 },
  { day: "Jun", metal: 77.6, paper: 90.4 },
];

export const wasteTypePercentages = [
  { name: "Metal", value: 55 },
  { name: "Paper", value: 45 }
];

export const collectionEfficiencyData: CollectionDataPoint[] = [
  { month: "Jan", collections: 24 },
  { month: "Feb", collections: 28 },
  { month: "Mar", collections: 26 },
  { month: "Apr", collections: 32 },
  { month: "May", collections: 29 },
  { month: "Jun", collections: 35 },
];

export const wasteDiversionData = [
  { month: "Jan", recycled: 85, landfill: 15 },
  { month: "Feb", recycled: 82, landfill: 18 },
  { month: "Mar", recycled: 88, landfill: 12 },
  { month: "Apr", recycled: 90, landfill: 10 },
  { month: "May", recycled: 92, landfill: 8 },
  { month: "Jun", recycled: 94, landfill: 6 },
];

export const wasteGenerationByBin = [
  { name: "Smart Bin", metal: 55, paper: 45 }
];
