import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "./secret.util";

export interface JwtPayload {
  id: string;
  email: string;
  store: string;
}

/**
 *
 * @param payload
 * @returns
 */
export const userJwt = async (payload: JwtPayload): Promise<string> =>
  jwt.sign(payload, SESSION_SECRET);
