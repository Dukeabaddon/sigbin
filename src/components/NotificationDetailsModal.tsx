
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from "@/contexts/NotificationContext";
import { getIcon } from "@/utils/notificationUtils";
import { Clock, MapPin, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NotificationDetailsModalProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationDetailsModal: React.FC<NotificationDetailsModalProps> = ({
  notification,
  open,
  onOpenChange,
}) => {
  if (!notification) return null;

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "warning";
      case "success":
        return "success";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon(notification.type)}
            <DialogTitle>{notification.message}</DialogTitle>
          </div>
          <DialogDescription className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>
                {notification.date}, {notification.timestamp}
              </span>
            </div>
            <Badge variant={getBadgeVariant(notification.type) as any}>
              {notification.type}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Bin ID</p>
              <p className="text-sm text-muted-foreground">
                {notification.binId || "N/A"}
              </p>
            </div>
            
            {notification.details?.location && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Location</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{notification.details.location}</span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {(notification.details?.actionRequired || notification.details?.actionTaken) && (
            <div className="space-y-3">
              {notification.details.actionRequired && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <p className="text-sm font-medium">Action Required</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {notification.details.actionRequired}
                  </p>
                </div>
              )}

              {notification.details.actionTaken && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm font-medium">Action Taken</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {notification.details.actionTaken}
                  </p>
                </div>
              )}
            </div>
          )}

          {notification.details?.sensorData && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium">Sensor Data</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pl-6">
                  {notification.details.sensorData.fillLevel !== undefined && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Fill Level</p>
                      <p className="text-sm font-medium">
                        {notification.details.sensorData.fillLevel}%
                      </p>
                    </div>
                  )}
                  {notification.details.sensorData.temperature !== undefined && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="text-sm font-medium">
                        {notification.details.sensorData.temperature}°C
                      </p>
                    </div>
                  )}
                  {notification.details.sensorData.humidity !== undefined && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="text-sm font-medium">
                        {notification.details.sensorData.humidity}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetailsModal;
