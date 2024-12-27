import React from 'react';
import NotificationList from '../components/notifications/NotificationList';

export default function Notifications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
      <NotificationList
        notifications={[]}
        onMarkAsRead={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}