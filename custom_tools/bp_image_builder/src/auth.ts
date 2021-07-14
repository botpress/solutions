import os from "os";
import { join as j } from "path";
import { JsonDB } from "node-json-db";
import { loginBasic } from "./strategies/basic";
export interface JWT {
  jwt: string;
  exp: number;
}

type loginStrategy = (url: string, payload: any) => Promise<JWT>;

class AuthManager {
  private _db: JsonDB;
  private _strategies = new Map<string, loginStrategy>();
  public init() {
    const dbpath = j(os.homedir(), ".bp_image_builder", "auth.db");
    this._db = new JsonDB(dbpath, true, false);
  }

  public registerStrategy(name: string, handler: loginStrategy): void {
    this._strategies.set(name, handler);
  }

  public async login(
    strategy: string,
    url: string,
    payload: any
  ): Promise<JWT> {
    if (!this._strategies.has(strategy)) {
      throw new Error(
        `Login strategy ${strategy} does not exist or is not registered`
      );
    }
    const { host } = new URL(url);
    const handler = this._strategies.get(strategy);

    const jwt = await handler(url, payload);
    this._db.push(`/${host}`, jwt);
    return jwt;
  }

  public getToken(url: string): JWT {
    const { host } = new URL(url);
    let jwt: JWT | undefined;
    try {
      jwt = this._db.getObject<JWT>(`/${host}`);
    } catch (err) {
      return null;
    }
    if (jwt.exp <= Date.now()) {
      throw new Error(`The token for ${host} has expired, please login again`);
    }
    return jwt;
  }
}

const manager = new AuthManager();

manager.init();
manager.registerStrategy("basic", loginBasic);

export default manager;
