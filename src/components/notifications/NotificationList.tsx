import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import type { Notification } from '../../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                notification.status ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center">
                <Bell className={`w-5 h-5 mr-3 ${notification.status ? 'text-gray-400' : 'text-blue-500'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{notification.body}</p>
                  <p className="text-xs text-gray-500">Type: {notification.type}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!notification.status && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="p-1 rounded-full text-green-600 hover:bg-green-100"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  className="p-1 rounded-full text-red-600 hover:bg-red-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}