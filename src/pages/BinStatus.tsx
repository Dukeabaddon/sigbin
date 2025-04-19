
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Battery, Wifi } from "lucide-react";

const BinStatus = () => {
  const [showManual, setShowManual] = useState(true);

  const bins = [
    {
      type: "Plastic",
      fillLevel: 75,
      icon: "🗑️",
    },
    {
      type: "Metal",
      fillLevel: 45,
      icon: "🗑️",
    },
  ];

  const getFillColor = (level: number) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (showManual) {
    return (
      <div className="max-w-md mx-auto py-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to S.I.G. Bin</h2>
          <div className="space-y-4 text-gray-600">
            <p>This smart waste segregation system helps you:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Automatically sort recyclable materials</li>
              <li>Monitor bin fill levels in real-time</li>
              <li>Track system status and maintenance needs</li>
              <li>Access usage analytics and reports</li>
            </ul>
            <p>Get started by checking the current bin status below.</p>
          </div>
          <Button 
            className="w-full mt-6"
            onClick={() => setShowManual(false)}
          >
            Get Started
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Battery className="text-green-500" />
          <span className="text-sm text-gray-600">Battery: 82%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="text-green-500" />
          <span className="text-sm text-gray-600">Sensors: Active</span>
        </div>
      </div>

      {bins.map((bin) => (
        <Card key={bin.type} className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-2xl">{bin.icon}</span>
            <h3 className="text-lg font-semibold">{bin.type} Bin</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fill Level</span>
              <span className="text-sm font-medium">{bin.fillLevel}%</span>
            </div>
            <Progress 
              value={bin.fillLevel} 
              className={`${getFillColor(bin.fillLevel)}`}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BinStatus;
