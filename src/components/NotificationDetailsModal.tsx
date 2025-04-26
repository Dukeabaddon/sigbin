
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
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
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
          <DialogDescription className="flex items-center gap-2 text-sm">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {notification.date}, {notification.timestamp}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {notification.details?.actionRequired && (
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

          {notification.details?.actionTaken && (
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

          {notification.details?.fillLevel !== undefined && (
            <>
              <Separator />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fill Level</p>
                <p className="text-sm font-medium">
                  {notification.details.fillLevel}%
                </p>
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
