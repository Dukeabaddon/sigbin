
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { day: "Mon", plastic: 4, metal: 2 },
  { day: "Tue", plastic: 3, metal: 4 },
  { day: "Wed", plastic: 5, metal: 3 },
  { day: "Thu", plastic: 2, metal: 5 },
  { day: "Fri", plastic: 6, metal: 2 },
];

const Analytics = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Plastic Waste</h3>
          <p className="text-2xl font-bold mt-1">14.3kg</p>
          <span className="text-xs text-green-600">+2.3% this week</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Metal Waste</h3>
          <p className="text-2xl font-bold mt-1">8.7kg</p>
          <span className="text-xs text-green-600">+1.5% this week</span>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Collection Trends</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="plastic"
                stroke="#10B981"
                name="Plastic"
              />
              <Line
                type="monotone"
                dataKey="metal"
                stroke="#6B7280"
                name="Metal"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
