import { useEffect, useState } from 'react';
import NotificationList from '../components/notifications/NotificationList';
import { getNotification } from '../api/notification';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Notification } from '../types';

const API_URL = "https://report-managment-latest.onrender.com/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError(null);
      try {
        const response = await getNotification();
        if (response && response.success) {
          setNotifications(response.data || []); // Default to an empty array if data is null
        }
      } catch (err) {
        setError((err as Error).message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, status: true } : notif
          )
        );
      } else {
        const errorData = await response.json();
        console.error('Failed to mark notification as read:', errorData.message);
      }
    } catch (err) {
      console.error('An unexpected error occurred while marking the notification as read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/notification/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete notification:', errorData.message);
      }
    } catch (err) {
      console.error('An unexpected error occurred while deleting the notification:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}
