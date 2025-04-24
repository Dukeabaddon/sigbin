
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trash2, Signal, Bell, CircleCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const BinStatus = () => {
  const bins = [
    {
      type: "Metal",
      fillLevel: 45,
      icon: <Trash2 className="h-6 w-6 text-yellow-500" />,
      color: "yellow"
    },
    {
      type: "Paper",
      fillLevel: 60,
      icon: <Trash2 className="h-6 w-6 text-blue-500" />,
      color: "blue"
    }
  ];

  const manualSections = [
    {
      title: "Smart Bin Interface",
      icon: <Signal className="h-5 w-5 text-green-600" />,
      content:
        "Monitor real-time bin status, fill levels, and system health through our intuitive dashboard interface. Track metal and paper waste collection efficiently."
    },
    {
      title: "Bin Monitoring",
      icon: <Trash2 className="h-5 w-5 text-green-600" />,
      content:
        "View detailed fill levels for each waste type. The system uses color-coded indicators to show current capacity - green for normal, yellow for moderate, and red for high fill levels."
    },
    {
      title: "System Status",
      icon: <CircleCheck className="h-5 w-5 text-green-600" />,
      content:
        "Keep track of the smart bin's operational status, including sensor functionality and system health indicators. Receive real-time updates on any maintenance requirements."
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5 text-green-600" />,
      content:
        "Stay informed with instant alerts about bin status, maintenance needs, and collection requirements. Customize notification preferences through the settings panel."
    }
  ];

  const getFillColor = (level: number, color: string) => {
    if (level >= 80) return "bg-red-400";
    if (level >= 60) {
      if (color === "yellow") return "bg-yellow-500";
      return "bg-blue-600";
    }
    if (color === "yellow") return "bg-yellow-400";
    return "bg-blue-500";
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-6 py-4">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-700">Smart Bin User Guide</h2>
          </div>
          
          <ScrollArea className="h-[calc(100vh-250px)] lg:h-[600px] rounded-md">
            <div className="space-y-5 pr-4">
              {manualSections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-50 p-1.5 rounded-full">
                      {section.icon}
                    </div>
                    <h3 className="text-md font-semibold text-green-600">{section.title}</h3>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed pl-7">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-green-700">Bin Status</h2>
          <div className="grid gap-6">
            {bins.map((bin) => (
              <Card 
                key={bin.type}
                className={cn(
                  "p-6 border-l-4",
                  bin.color === "yellow" ? "border-l-yellow-400" : "border-l-blue-400"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  {bin.icon}
                  <h3 className="text-lg font-semibold text-green-700">{bin.type} Bin</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-600">Fill Level</span>
                    <span className={cn(
                      "text-sm font-medium",
                      bin.color === "yellow" ? "text-yellow-600" : "text-blue-600"
                    )}>
                      {bin.fillLevel}%
                    </span>
                  </div>
                  <Progress 
                    value={bin.fillLevel} 
                    className={`h-3 ${getFillColor(bin.fillLevel, bin.color)}`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinStatus;
