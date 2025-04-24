
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendInfo {
  direction: string;
  percentage: string;
}

interface WasteStats {
  metal: number;
  paper: number;
}

interface WasteStatsCardsProps {
  wasteStats: WasteStats;
  metalTrend: TrendInfo;
  paperTrend: TrendInfo;
  totalTrend: TrendInfo;
}

const WasteStatsCards = ({ wasteStats, metalTrend, paperTrend, totalTrend }: WasteStatsCardsProps) => {
  return (
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
  );
};

export default WasteStatsCards;
