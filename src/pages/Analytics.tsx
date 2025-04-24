
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import WasteStatsCards from "@/components/analytics/WasteStatsCards";
import CollectionTrends from "@/components/analytics/CollectionTrends";
import WasteDistribution from "@/components/analytics/WasteDistribution";
import RecyclingRate from "@/components/analytics/RecyclingRate";

import {
  dailyWasteData,
  weeklyWasteData,
  monthlyWasteData,
  wasteTypePercentages,
  wasteDiversionData,
} from "@/utils/analyticsData";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("day");
  const [wasteFilterType, setWasteFilterType] = useState("all");

  const wasteData = 
    timeRange === "day" ? dailyWasteData : 
    timeRange === "week" ? weeklyWasteData : 
    monthlyWasteData;

  const filteredWasteData = wasteData.map(item => {
    if (wasteFilterType === "all") return item;
    const filtered: any = { day: item.day };
    filtered[wasteFilterType] = item[wasteFilterType as keyof typeof item];
    return filtered;
  });

  const getWasteTotals = () => {
    return wasteData.reduce(
      (acc, curr) => {
        acc.metal += curr.metal;
        acc.paper += curr.paper;
        return acc;
      },
      { metal: 0, paper: 0 }
    );
  };

  const wasteStats = getWasteTotals();
  
  const getTrend = () => {
    const trend = Math.random() > 0.5 ? "up" : "down";
    const percentage = (Math.random() * 8 + 1).toFixed(1);
    return { direction: trend, percentage };
  };

  const metalTrend = getTrend();
  const paperTrend = getTrend();
  const totalTrend = getTrend();

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-green-800">Waste Analytics</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end w-full sm:w-auto">
          <div className="space-y-1.5">
            <Label htmlFor="timeRange">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="timeRange" className="w-full sm:w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="wasteType">Waste Type</Label>
            <Select value={wasteFilterType} onValueChange={setWasteFilterType}>
              <SelectTrigger id="wasteType" className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <WasteStatsCards
        wasteStats={wasteStats}
        metalTrend={metalTrend}
        paperTrend={paperTrend}
        totalTrend={totalTrend}
      />

      <Tabs defaultValue="trends" className="w-full space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full mb-8">
          <TabsTrigger value="trends">Collection Trends</TabsTrigger>
          <TabsTrigger value="distribution">Waste Distribution</TabsTrigger>
          <TabsTrigger value="diversion">Recycling Rate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="space-y-8">
          <CollectionTrends
            filteredWasteData={filteredWasteData}
            wasteFilterType={wasteFilterType}
          />
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-8">
          <WasteDistribution wasteTypePercentages={wasteTypePercentages} />
        </TabsContent>
        
        <TabsContent value="diversion" className="space-y-8">
          <RecyclingRate wasteDiversionData={wasteDiversionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
