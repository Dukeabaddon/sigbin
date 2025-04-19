
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Battery, Wifi, ScrollText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const BinStatus = () => {
  const bins = [
    {
      type: "Plastic",
      fillLevel: 75,
      icon: "🗑️",
      color: "green"
    },
    {
      type: "Metal",
      fillLevel: 45,
      icon: "🗑️",
      color: "yellow"
    },
    {
      type: "Paper",
      fillLevel: 60,
      icon: "🗑️",
      color: "blue"
    }
  ];

  const manualSections = [
    {
      title: "Waste Segregation",
      icon: "♻️",
      content:
        "The S.I.G. Bin uses advanced sensors to automatically detect and sort recyclable materials. Simply place your waste near the sensors, and the system will guide you to the correct bin."
    },
    {
      title: "Sanitization",
      icon: "💧",
      content:
        "A motion-activated alcohol dispenser is available for touchless hand sanitization. Wave your hand under the dispenser to receive the appropriate amount of sanitizer."
    },
    {
      title: "System Status",
      icon: "🔌",
      content:
        "Monitor bin fill levels, battery status, and sensor functionality through the dashboard. The system provides real-time updates on all components."
    },
    {
      title: "Maintenance",
      icon: "🔋",
      content:
        "Regular maintenance checks are performed automatically. The system will notify appropriate personnel when bins need to be emptied or when maintenance is required."
    },
    {
      title: "Alerts & Notifications",
      icon: "🔔",
      content:
        "Configure your notification preferences to receive alerts about bin status, maintenance requirements, and system updates through the app."
    }
  ];

  const getFillColor = (level: number, color: string) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 60) {
      if (color === "green") return "bg-green-500";
      if (color === "yellow") return "bg-yellow-500";
      return "bg-blue-500";
    }
    if (color === "green") return "bg-green-400";
    if (color === "yellow") return "bg-yellow-400";
    return "bg-blue-400";
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="p-6 backdrop-blur-sm bg-gradient-to-br from-green-50 to-green-100 border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-full">
            <ScrollText className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-green-800">User Guide</h2>
        </div>
        
        <ScrollArea className="h-64 rounded-md">
          <div className="space-y-5 pr-4">
            {manualSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{section.icon}</span>
                  <h3 className="text-md font-semibold text-green-700">{section.title}</h3>
                </div>
                <p className="text-sm text-green-900 leading-relaxed pl-7">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <Battery className="text-green-500" />
          <span className="text-sm text-green-700">Battery: 82%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="text-green-500" />
          <span className="text-sm text-green-700">Sensors: Active</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-green-800 pt-2">Bin Status</h2>
      
      <div className="grid gap-4">
        {bins.map((bin) => (
          <Card 
            key={bin.type}
            className={cn(
              "p-4 border-l-4",
              bin.color === "green" ? "border-l-green-500" : 
              bin.color === "yellow" ? "border-l-yellow-500" : "border-l-blue-500"
            )}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-2xl">{bin.icon}</span>
              <h3 className="text-lg font-semibold text-gray-700">{bin.type} Bin</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fill Level</span>
                <span className={cn(
                  "text-sm font-medium",
                  bin.fillLevel >= 80 ? "text-red-600" : 
                  bin.fillLevel >= 60 ? "text-yellow-600" : "text-green-600"
                )}>
                  {bin.fillLevel}%
                </span>
              </div>
              <Progress 
                value={bin.fillLevel} 
                className={`h-2.5 ${getFillColor(bin.fillLevel, bin.color)}`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BinStatus;
