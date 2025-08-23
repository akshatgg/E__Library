// lib/api.ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

//  Reusable fetch wrapper for API calls

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<{success: boolean; data?: T; message?: string}> {
  const {method = "GET", body, headers = {}, credentials = "include"} = options;

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
    });

    const data = await res.json();

    if (!res.ok) {
      return {success: false, message: data?.message || "Something went wrong"};
    }

    // Assert type here
    return data as ApiResponse<T>;
  } catch (err: any) {
    console.error("API Fetch Error:", err);
    return {success: false, message: err.message || "Network error"};
  }
}
