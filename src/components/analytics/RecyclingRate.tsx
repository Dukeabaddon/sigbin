
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

interface RecyclingRateProps {
  wasteDiversionData: Array<{
    month: string;
    recycled: number;
    landfill: number;
  }>;
}

const RecyclingRate = ({ wasteDiversionData }: RecyclingRateProps) => {
  return (
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
  );
};

export default RecyclingRate;
