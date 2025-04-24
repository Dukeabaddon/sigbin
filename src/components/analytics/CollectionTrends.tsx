
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { WasteDataPoint } from "@/utils/analyticsData";

interface CollectionTrendsProps {
  filteredWasteData: WasteDataPoint[];
  wasteFilterType: string;
}

const CollectionTrends = ({ filteredWasteData, wasteFilterType }: CollectionTrendsProps) => {
  return (
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
  );
};

export default CollectionTrends;
