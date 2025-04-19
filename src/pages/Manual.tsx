
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Recycle,
  Droplet,
  Battery,
  Wifi,
  AlertTriangle,
} from "lucide-react";

const Manual = () => {
  const sections = [
    {
      title: "Waste Segregation",
      icon: Recycle,
      content:
        "The S.I.G. Bin uses advanced sensors to automatically detect and sort recyclable materials. Simply place your waste near the sensors, and the system will guide you to the correct bin.",
    },
    {
      title: "Sanitization",
      icon: Droplet,
      content:
        "A motion-activated alcohol dispenser is available for touchless hand sanitization. Wave your hand under the dispenser to receive the appropriate amount of sanitizer.",
    },
    {
      title: "System Status",
      icon: Wifi,
      content:
        "Monitor bin fill levels, battery status, and sensor functionality through the dashboard. The system provides real-time updates on all components.",
    },
    {
      title: "Maintenance",
      icon: Battery,
      content:
        "Regular maintenance checks are performed automatically. The system will notify appropriate personnel when bins need to be emptied or when maintenance is required.",
    },
    {
      title: "Alerts & Notifications",
      icon: AlertTriangle,
      content:
        "Configure your notification preferences to receive alerts about bin status, maintenance requirements, and system updates through the app.",
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">How to Use S.I.G. Bin</h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <section.icon className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Manual;
