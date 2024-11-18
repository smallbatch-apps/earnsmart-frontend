import { useUserStore } from "@/stores/useUserStore";

const HTTP_HOST = process.env.NEXT_PUBLIC_API_HOST ?? "";

const getAuthHeaders = () => {
  const jwt = useUserStore.getState().jwt;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  return headers;
};

export async function clientGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(HTTP_HOST + endpoint, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return await response.json();
}

export async function clientPost(
  endpoint: string,
  payload: Record<string, any>
) {
  return await fetch(HTTP_HOST + endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: getAuthHeaders(),
  });
}

export async function clientPatch(
  endpoint: string,
  payload: Record<string, any>
) {
  return await fetch(HTTP_HOST + endpoint, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: getAuthHeaders(),
  });
}
