
import { Card } from "@/components/ui/card";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

const mockLogs = [
  {
    id: 1,
    type: "warning",
    message: "Plastic bin nearly full",
    timestamp: "10:30 AM",
    date: "Today",
  },
  {
    id: 2,
    type: "info",
    message: "Maintenance check completed",
    timestamp: "9:15 AM",
    date: "Today",
  },
  {
    id: 3,
    type: "success",
    message: "Metal bin emptied",
    timestamp: "8:45 AM",
    date: "Today",
  },
  {
    id: 4,
    type: "warning",
    message: "Battery level low",
    timestamp: "4:20 PM",
    date: "Yesterday",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

const SystemLogs = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        {Object.entries(
          mockLogs.reduce((acc: { [key: string]: typeof mockLogs }, log) => {
            if (!acc[log.date]) acc[log.date] = [];
            acc[log.date].push(log);
            return acc;
          }, {})
        ).map(([date, logs]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{date}</h3>
            <Card className="divide-y divide-gray-100">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-4"
                >
                  {getIcon(log.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.message}</p>
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;
