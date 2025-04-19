
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { getIcon } from "@/utils/notificationUtils";

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleViewAll = () => {
    navigate("/logs");
    setIsOpen(false);
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    // The actual modal will be shown from the SystemLogs page
    navigate(`/logs?notificationId=${notification.id}`);
    setIsOpen(false);
  };

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc: Record<string, Notification[]>, notification) => {
    if (!acc[notification.date]) acc[notification.date] = [];
    acc[notification.date].push(notification);
    return acc;
  }, {});

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-[300px]">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <DropdownMenuGroup key={date}>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {date}
                </DropdownMenuLabel>
                
                {dateNotifications
                  .filter((_, index) => index < 4) // Show only 4 most recent per date group
                  .map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 cursor-pointer ${
                        !notification.isRead ? "bg-green-50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{notification.message}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          <span className="text-xs font-medium text-gray-600">{notification.binId}</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        <div className="p-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sm"
            onClick={handleViewAll}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
