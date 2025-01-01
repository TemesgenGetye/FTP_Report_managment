const API_URL = 'https://report-managment-latest.onrender.com/api';
import type { Notification } from '../types';

const id = localStorage.getItem('id');
const token = localStorage.getItem("token");


export async function getNotification() {
  try {
    const response = await fetch(`${API_URL}/notification/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }});
    const responseData: { success: boolean; data: Notification[]; error?: string } = await response.json();

    return responseData; // Ensure response matches expected format
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || 'An unexpected error occurred',
    };
  }
}
