import fetch from "node-fetch";
import { JWT } from ".";

export async function loginBasic(
  url: string,
  payload: { email: string; password: string }
): Promise<JWT> {
  const endpoint = new URL("/api/v2/admin/auth/login/basic/default", url);

  const res = await fetch(endpoint.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Unable to login: ${res.status} ${data.message}`);
  }
  if (!data.payload) {
    throw new Error(`Unable to retrieve token`);
  }

  return {
    jwt: data.payload.jwt,
    exp: Date.now() + data.payload.exp,
  };
}
