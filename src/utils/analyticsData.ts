
export interface WasteDataPoint {
  day: string;
  plastic: number;
  metal: number;
  paper: number;
}

export interface CollectionDataPoint {
  month: string;
  collections: number;
}

export const dailyWasteData: WasteDataPoint[] = [
  { day: "Mon", plastic: 4.2, metal: 2.1, paper: 3.5 },
  { day: "Tue", plastic: 3.8, metal: 4.3, paper: 2.9 },
  { day: "Wed", plastic: 5.1, metal: 3.2, paper: 4.2 },
  { day: "Thu", plastic: 2.7, metal: 5.4, paper: 3.1 },
  { day: "Fri", plastic: 6.3, metal: 2.8, paper: 5.4 },
  { day: "Sat", plastic: 3.9, metal: 1.9, paper: 2.8 },
  { day: "Sun", plastic: 3.1, metal: 1.5, paper: 2.3 },
];

export const weeklyWasteData: WasteDataPoint[] = [
  { day: "Week 1", plastic: 24.3, metal: 18.5, paper: 22.7 },
  { day: "Week 2", plastic: 26.9, metal: 17.2, paper: 20.8 },
  { day: "Week 3", plastic: 28.1, metal: 19.4, paper: 24.3 },
  { day: "Week 4", plastic: 25.7, metal: 20.8, paper: 21.9 },
];

export const monthlyWasteData: WasteDataPoint[] = [
  { day: "Jan", plastic: 105.3, metal: 76.2, paper: 89.7 },
  { day: "Feb", plastic: 98.1, metal: 70.5, paper: 82.3 },
  { day: "Mar", plastic: 110.7, metal: 79.4, paper: 91.2 },
  { day: "Apr", plastic: 104.5, metal: 74.8, paper: 88.5 },
  { day: "May", plastic: 115.2, metal: 83.1, paper: 93.7 },
  { day: "Jun", plastic: 107.9, metal: 77.6, paper: 90.4 },
];

export const wasteTypePercentages = [
  { name: "Plastic", value: 45 },
  { name: "Metal", value: 30 },
  { name: "Paper", value: 25 },
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
  { name: "North Wing", plastic: 45, metal: 25, paper: 30 },
  { name: "South Wing", plastic: 35, metal: 35, paper: 30 },
  { name: "East Wing", plastic: 40, metal: 30, paper: 30 },
  { name: "West Wing", plastic: 50, metal: 20, paper: 30 },
];
