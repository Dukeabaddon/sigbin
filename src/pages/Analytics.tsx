import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import {
  dailyWasteData,
  weeklyWasteData,
  monthlyWasteData,
  wasteTypePercentages,
  collectionEfficiencyData,
  wasteDiversionData,
  wasteGenerationByBin
} from "@/utils/analyticsData";

const COLORS = ["#10B981", "#6B7280", "#3B82F6"];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("day");
  const [wasteFilterType, setWasteFilterType] = useState("all");
  const [comparisonPeriod, setComparisonPeriod] = useState("previousPeriod");

  const wasteData = 
    timeRange === "day" ? dailyWasteData : 
    timeRange === "week" ? weeklyWasteData : 
    monthlyWasteData;

  const filteredWasteData = wasteData.map(item => {
    if (wasteFilterType === "all") return item;
    
    // Keep day and only the selected waste type
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
  
  const getTrend = (value: number) => {
    // Mocked trends - in a real app, would compare with previous periods
    const trend = Math.random() > 0.5 ? "up" : "down";
    const percentage = (Math.random() * 8 + 1).toFixed(1);
    return {
      direction: trend,
      percentage
    };
  };

  const metalTrend = getTrend(wasteStats.metal);
  const paperTrend = getTrend(wasteStats.paper);
  const totalTrend = getTrend(wasteStats.metal + wasteStats.paper);

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-green-800">Waste Analytics</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end w-full sm:w-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-sm bg-white/90 border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Metal Waste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">{wasteStats.metal.toFixed(1)}kg</p>
                <div className="flex items-center gap-1 mt-1">
                  {metalTrend.direction === "up" ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span 
                    className={cn(
                      "text-xs", 
                      metalTrend.direction === "up" ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {metalTrend.percentage}% {metalTrend.direction === "up" ? "increase" : "decrease"}
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/90 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Paper Waste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">{wasteStats.paper.toFixed(1)}kg</p>
                <div className="flex items-center gap-1 mt-1">
                  {paperTrend.direction === "up" ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span 
                    className={cn(
                      "text-xs", 
                      paperTrend.direction === "up" ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {paperTrend.percentage}% {paperTrend.direction === "up" ? "increase" : "decrease"}
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/90 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Recycled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">{(wasteStats.paper + wasteStats.metal).toFixed(1)}kg</p>
                <div className="flex items-center gap-1 mt-1">
                  {totalTrend.direction === "up" ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span 
                    className={cn(
                      "text-xs", 
                      totalTrend.direction === "up" ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {totalTrend.percentage}% {totalTrend.direction === "up" ? "increase" : "decrease"}
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full">
          <TabsTrigger value="trends">Collection Trends</TabsTrigger>
          <TabsTrigger value="distribution">Waste Distribution</TabsTrigger>
          <TabsTrigger value="diversion">Recycling Rate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="space-y-8">
          <Card className="backdrop-blur-sm bg-white/90">
            <CardHeader>
              <CardTitle>Waste Collection Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredWasteData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip 
                      formatter={(value: number) => [`${value} kg`, undefined]}
                      labelFormatter={(label) => `Day: ${label}`}
                    />
                    {(wasteFilterType === "all" || wasteFilterType === "metal") && (
                      <Line
                        type="monotone"
                        dataKey="metal"
                        stroke="#6B7280"
                        name="Metal"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    {(wasteFilterType === "all" || wasteFilterType === "paper") && (
                      <Line
                        type="monotone"
                        dataKey="paper"
                        stroke="#3B82F6"
                        name="Paper"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-8">
          <Card className="backdrop-blur-sm bg-white/90">
            <CardHeader>
              <CardTitle>Waste Type Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <div className="h-[250px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteTypePercentages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {wasteTypePercentages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => [`${value}%`, undefined]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-6 w-full md:w-1/2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                    <span className="text-sm font-medium">Metal Waste</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Metal waste includes aluminum cans, small metal objects, and various
                    metal packaging materials.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm font-medium">Paper Waste</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Paper waste includes cardboard, office papers, newspapers, and various
                    packaging materials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diversion" className="space-y-8">
          <Card className="backdrop-blur-sm bg-white/90">
            <CardHeader>
              <CardTitle>Recycling Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={wasteDiversionData}
                    stackOffset="expand"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(tick) => `${tick * 100}%`} />
                    <RechartsTooltip formatter={(value: number) => [`${value}%`, undefined]} />
                    <Area
                      type="monotone"
                      dataKey="recycled"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      name="Recycled"
                    />
                    <Area
                      type="monotone"
                      dataKey="landfill"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      name="Landfill"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Diversion Rate Increased</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Waste diversion rate has improved by 9% over the last 6 months, 
                  reaching 94% in the most recent month. This results in approximately 
                  560kg less waste sent to landfills.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
