
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type NotificationType = "info" | "warning" | "success" | "error";

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  date: string;
  binId?: string;
  isRead: boolean;
  details?: {
    location?: string;
    actionRequired?: string;
    actionTaken?: string;
    sensorData?: {
      temperature?: number;
      humidity?: number;
      fillLevel?: number;
    };
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "isRead">) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const mockNotifications: Omit<Notification, "id" | "isRead">[] = [
  {
    type: "warning",
    message: "Plastic bin nearly full",
    timestamp: "10:30 AM",
    date: "Today",
    binId: "BIN",
    details: {
      location: "North Wing",
      actionRequired: "Empty bin within 2 hours",
      sensorData: {
        fillLevel: 85,
        temperature: 24,
        humidity: 45
      }
    }
  },
  {
    type: "info",
    message: "Maintenance check completed",
    timestamp: "9:15 AM",
    date: "Today",
    binId: "SYS",
    details: {
      actionTaken: "System diagnostics run successfully",
      sensorData: {
        temperature: 22,
        humidity: 40
      }
    }
  },
  {
    type: "success",
    message: "Metal bin emptied",
    timestamp: "8:45 AM",
    date: "Today",
    binId: "BIN",
    details: {
      location: "South Wing",
      actionTaken: "Bin emptied and sanitized",
      sensorData: {
        fillLevel: 5,
        temperature: 23,
        humidity: 42
      }
    }
  },
  {
    type: "warning",
    message: "Battery level low",
    timestamp: "4:20 PM",
    date: "Yesterday",
    binId: "SYS",
    details: {
      actionRequired: "Replace batteries within 24 hours",
      sensorData: {
        temperature: 25
      }
    }
  },
  {
    type: "error",
    message: "Connection lost to Bin",
    timestamp: "2:30 PM",
    date: "Yesterday",
    binId: "BIN",
    details: {
      location: "East Wing",
      actionRequired: "Check network connectivity",
      actionTaken: "System restart attempted"
    }
  },
  {
    type: "info",
    message: "System update available",
    timestamp: "9:00 AM",
    date: "Yesterday",
    binId: "SYS",
    details: {
      actionRequired: "Schedule update during off-hours"
    }
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize with mock data
    setNotifications(
      mockNotifications.map((notif, index) => ({
        ...notif,
        id: index + 1,
        isRead: false
      }))
    );
  }, []);

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, "id" | "isRead">) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: notification.message,
      description: `${notification.binId || 'System'}: ${notification.timestamp}`,
      variant: notification.type === "error" ? "destructive" : "default"
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead, 
        addNotification,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
