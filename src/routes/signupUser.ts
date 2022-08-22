import { InternalServerError, validationMiddleware } from "@meemsd/common";
import { Request, Response, Router } from "express";
import { signupUserValidator } from "../validators/signupUser.validator";
import { User } from "../models/user";

const router = Router();

router.post(
  "/signup",
  signupUserValidator,
  validationMiddleware,
  async (req: Request, res: Response) => {

    const { email, password, store } = req.body;
    try {
      const user = User.build({ email, password, store });
        await user.save();

      res.status(201).send(user);
    } catch {
      throw new InternalServerError();
    }
  }
);

export { router as signupUserRouter };
