import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trash2, Signal, Bell, CircleCheck, Wrench, Battery } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const BinStatus = () => {
  const bins = [
    {
      type: "Metal",
      fillLevel: 45,
      icon: <Trash2 className="h-6 w-6 text-yellow-500" />,
      color: "yellow",
      sensorStatus: "Good",
      servoStatus: "Needs Maintenance",
      batteryLevel: 85
    },
    {
      type: "Paper",
      fillLevel: 60,
      icon: <Trash2 className="h-6 w-6 text-blue-500" />,
      color: "blue",
      sensorStatus: "Good",
      servoStatus: "Good",
      batteryLevel: 92
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
    },
    {
      title: "Maintenance",
      icon: <Wrench className="h-5 w-5 text-green-600" />,
      content:
        "To ensure proper functioning, periodically check and clean the bin's sensors and servomotors. Recommended maintenance is every 2 months or after heavy usage."
    }
  ];

  const getFillOpacity = (level: number) => {
    if (level >= 80) return "opacity-90";
    if (level >= 60) return "opacity-60";
    return "opacity-30";
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-6xl 2xl:max-w-[1440px] space-y-6 py-4">
      <div className="flex flex-col items-center gap-8">
        {/* Smart Bin User Guide Section */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-700">Smart Bin User Guide</h2>
          </div>
          
          <ScrollArea className="h-[400px] rounded-md">
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

        {/* Bin Status Section */}
        <div className="w-full space-y-6">
          <h2 className="text-xl font-bold text-green-700">Bin Status</h2>
          <div className="grid gap-6">
            {bins.map((bin) => (
              <Card 
                key={bin.type}
                className={cn(
                  "p-6 border-l-4",
                  bin.type === "Metal" 
                    ? "border-l-yellow-400 bg-yellow-50/30" 
                    : "border-l-blue-400 bg-blue-50/30"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  {bin.icon}
                  <h3 className="text-lg font-semibold text-green-700">{bin.type} Bin</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-600">Fill Level</span>
                    <span className="text-sm font-medium text-green-600">
                      {bin.fillLevel}%
                    </span>
                  </div>
                  <Progress 
                    value={bin.fillLevel} 
                    className={cn(
                      "h-3",
                      bin.type === "Metal" 
                        ? "bg-yellow-100" : "bg-blue-100"
                    )}
                    indicatorClassName={cn(
                      bin.type === "Metal" 
                        ? "bg-yellow-500" : "bg-blue-500",
                      getFillOpacity(bin.fillLevel)
                    )}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* System Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-green-50/30">
              <div className="flex items-center gap-2 mb-2">
                <Signal className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-semibold text-green-700">Sensor Status</h4>
              </div>
              <p className={cn(
                "text-sm font-medium",
                bins[0].sensorStatus === "Good" ? "text-green-600" : "text-amber-600"
              )}>
                {bins[0].sensorStatus}
              </p>
            </Card>

            <Card className="p-4 bg-green-50/30">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-semibold text-green-700">Servo Motor Status</h4>
              </div>
              <p className={cn(
                "text-sm font-medium",
                bins[0].servoStatus === "Good" ? "text-green-600" : "text-amber-600"
              )}>
                {bins[0].servoStatus}
              </p>
            </Card>

            <Card className="p-4 bg-green-50/30">
              <div className="flex items-center gap-2 mb-2">
                <Battery className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-semibold text-green-700">Battery Level</h4>
              </div>
              <p className="text-sm font-medium text-green-600">
                {bins[0].batteryLevel}%
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinStatus;
