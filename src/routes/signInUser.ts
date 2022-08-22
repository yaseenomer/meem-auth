import {
  NotFoundError,
  validationMiddleware,
  InternalServerError,
} from "@meemsd/common";

import { Request, Response, Router } from "express";

import { User } from "../models/user";
import { signinValidator } from "../validators/signin.validator";
import { PasswordUtil } from "../utils/password.util";
import { userJwt } from "../utils/jwt.util";
import session from "express-session";

declare module 'express-session' {
  export interface SessionData {
    jwt?: string;
  }
}

// 
const router = Router();

/**
 * @api {post} /api/users/signin Signin a user
 * @apiName SigninUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 */
router.post(
  "/signin",
  signinValidator,
  validationMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {

        // 1. check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new NotFoundError("Invalid email or password");
      }


      // 2. check if password is correct
      const passwordMatch = await PasswordUtil.compare(user.password, password);
      if (!passwordMatch) {
        throw new NotFoundError("Invalid email or password");
      }


        // 3. generate jwt
      const { id, store } = user;
    
      const jwt = await userJwt({ id, email, store });


  
        req.session.jwt = jwt;


      // 4. send jwt to client
      return res.status(200).json({ user, jwt });
    } catch (err) {
      throw new InternalServerError("Invalid email or password");
    }
  }
);


export { router as signinRouter };
