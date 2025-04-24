
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from "recharts";

const COLORS = ["#10B981", "#6B7280", "#3B82F6"];

interface WasteDistributionProps {
  wasteTypePercentages: Array<{ name: string; value: number }>;
}

const WasteDistribution = ({ wasteTypePercentages }: WasteDistributionProps) => {
  return (
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
  );
};

export default WasteDistribution;
