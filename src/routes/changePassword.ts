

import { Request, Response, Router  } from 'express';
import passport from 'passport';
import { User, UserDoc } from '../models/user';
import { PasswordUtil } from '../utils/password.util';
import { NotFoundError,  } from '@meemsd/common';


const router = Router();

router.post(
    "/change-password",
    passport.authenticate('jwt'),
    async  (req: Request, res: Response) => {
      
        const { oldPassword, newPassword } = req.body;

        const { id  } = req.user as UserDoc;


        // 1. check if user exists
          const user = await User.findById(id);

          if (!user) throw new  NotFoundError()


        // 2. check if password is correct
        const  passwordMatch = await PasswordUtil.compare(user.password, oldPassword);

        if (!passwordMatch) throw new NotFoundError("Invalid old password");


        // 3. update password
        user.password = newPassword;
        await user.save();

       
        // 4. send message user
        return res.status(200).json({ message: "Password changed successfully" });

    }           
);


export { router as changePasswordRouter };
