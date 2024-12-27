import type { Report } from "../types";

const API_URL = "https://report-managment-latest.onrender.com/api";
const token = localStorage.getItem("token");

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

export async function createReport(
  data: Partial<Report>
): Promise<ApiResponse<Report>> {
  try {
    const response = await fetch(`${API_URL}/report/din`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to create report",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function getAllReports(): Promise<ApiResponse<Report[]>> {
  try {
    const response = await fetch(`${API_URL}/report/din`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to fetch reports",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function getDraftReports(): Promise<ApiResponse<Report[]>> {
  try {
    const response = await fetch(`${API_URL}/report/din/draft`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to fetch draft reports",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function getSubmittedReports(): Promise<ApiResponse<Report[]>> {
  try {
    const response = await fetch(`${API_URL}/report/din/submitted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to fetch submitted reports",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function saveReport(data) {
  try {
    const response = await fetch(`${API_URL}/report/din`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to save report",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function submitReport(data) {
  try {
    const response = await fetch(`${API_URL}/report/din/submit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to submit report",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function getReportById(id: string): Promise<ApiResponse<Report>> {
  try {
    const response = await fetch(`${API_URL}/report/din/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return {
      success: response.ok,
      data: response.ok ? responseData : null,
      error: response.ok
        ? undefined
        : responseData.message || "Failed to fetch report",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}

export async function deleteReport(id: string): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_URL}/report/din/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return {
        success: true,
        data: null,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        data: null,
        error: errorData.message || "Failed to delete report",
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}
