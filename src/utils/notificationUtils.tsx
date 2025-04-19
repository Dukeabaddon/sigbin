import React from "react";
import { AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { NotificationType } from "@/contexts/NotificationContext";

export const getIcon = (type: NotificationType) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
    default:
      return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />;
  }
};

export const formatTimestamp = (timestamp: string): string => {
  // This is a simple implementation. In a real app, you'd use a library like date-fns
  if (!timestamp) return "";
  
  try {
    // Check if it's already a formatted time (e.g., "10:30 AM")
    if (/^\d{1,2}:\d{2}\s?(?:AM|PM)$/i.test(timestamp)) {
      return timestamp;
    }
    
    // Try to parse as ISO date or timestamp
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return timestamp;
  }
};

export const formatDate = (date: string | Date): string => {
  if (!date) return "";
  
  try {
    // If it's "Today" or "Yesterday", return as is
    if (typeof date === 'string' && (date === 'Today' || date === 'Yesterday')) {
      return date;
    }
    
    // Otherwise format the date
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch (error) {
    return typeof date === 'string' ? date : '';
  }
};
