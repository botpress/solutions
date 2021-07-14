import os from "os";
import { join as j } from "path";
import { JsonDB } from "node-json-db";
import { loginBasic } from "./basic";
import { AbstractMultiStrategy } from "../multistrategy";

export interface JWT {
  jwt: string;
  exp: number;
}

type LoginStrategy = (url: string, payload: any) => Promise<JWT>;

class AuthManager extends AbstractMultiStrategy<LoginStrategy> {
  private _db: JsonDB;
  public init() {
    const dbpath = j(os.homedir(), ".bp_image_builder", "auth.db");
    this._db = new JsonDB(dbpath, true, false);
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
