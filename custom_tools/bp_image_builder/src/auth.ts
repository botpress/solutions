import fetch from "node-fetch";
import { JsonDB } from "node-json-db";

interface JWT {
  jwt: string;
  exp: number;
}

export async function loginBasic(
  url: string,
  email: string,
  password: string
): Promise<string> {
  const endpoint = new URL("/api/v2/admin/auth/login/basic/default", url);

  const res = await fetch(endpoint.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Unable to login: ${res.status} ${data.message}`);
  }
  if (!data.payload) {
    throw new Error(`Unable to retrieve token`);
  }

  return data.payload.jwt;
}

class AuthManager {
  private _db: JsonDB;
  init() {
    this._db = new JsonDB("tokens.db", true, false);
  }

  async loginBasic(url: string, email: string, password: string): Promise<JWT> {
    const endpoint = new URL("/api/v2/admin/auth/login/basic/default", url);
    const jwt = this._db.getObject<JWT>(`/${endpoint.host}`);
    if (jwt) {
      return jwt;
    }
    const res = await fetch(endpoint.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Unable to login: ${res.status} ${data.message}`);
    }
    if (!data.payload) {
      throw new Error(`Unable to retrieve token`);
    }

    this._db.push(`/${endpoint.host}`, {
      jwt: data.payload.jwt,
      exp: Date.now() + data.payload.exp * 1000,
    });
    return data.payload.jwt;
  }
}
