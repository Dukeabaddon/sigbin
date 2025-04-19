
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { getIcon } from "@/utils/notificationUtils";
import NotificationDetailsModal from "@/components/NotificationDetailsModal";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SystemLogs = () => {
  const { notifications } = useNotifications();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  
  useEffect(() => {
    const notificationId = searchParams.get("notificationId");
    if (notificationId) {
      const notification = notifications.find(n => n.id === parseInt(notificationId));
      if (notification) {
        setSelectedNotification(notification);
        setModalOpen(true);
      }
    }
  }, [searchParams, notifications]);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const filteredNotifications = filterType === "all" 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((acc: { [key: string]: Notification[] }, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-800">System Logs</h1>
          <div className="w-32">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4 space-y-4">
            {Object.entries(groupedNotifications).length > 0 ? (
              Object.entries(groupedNotifications).map(([date, logs]) => (
                <div key={date}>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{date}</h3>
                  <Card className="divide-y divide-gray-100">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNotificationClick(log)}
                      >
                        {getIcon(log.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{log.message}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                            <span className="text-xs font-medium text-gray-600">{log.binId}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No logs found
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="mt-4 space-y-4">
            {Object.entries(
              filteredNotifications
                .filter(n => !n.isRead)
                .reduce((acc: { [key: string]: Notification[] }, log) => {
                  if (!acc[log.date]) acc[log.date] = [];
                  acc[log.date].push(log);
                  return acc;
                }, {})
            ).length > 0 ? (
              Object.entries(
                filteredNotifications
                  .filter(n => !n.isRead)
                  .reduce((acc: { [key: string]: Notification[] }, log) => {
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
                        className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNotificationClick(log)}
                      >
                        {getIcon(log.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{log.message}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                            <span className="text-xs font-medium text-gray-600">{log.binId}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No unread logs
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <NotificationDetailsModal
        notification={selectedNotification}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default SystemLogs;
