import { Router, Request, Response } from "express";
import "express-async-errors";
import passport from 'passport';
import "../config/passport"

const router = Router();

router.post(
    "/me",
    passport.authenticate('jwt'),
    (req: Request, res: Response) => {
        return res.status(200).json({ user: req.user, isAuthenticated: req.isAuthenticated() });
    }
);

export { router as currentUserRouter };