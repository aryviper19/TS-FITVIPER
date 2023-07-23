import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User, UserModel } from '../models/userModel'
import { baseUrl, generateToken, } from '../utils'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const userRouter = express.Router()
// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).json({ message: 'Invalid email or password' })
  })
)
userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User)
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  })
)


//How?
userRouter.post(
'/forget-password',
expressAsyncHandler(async( req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

 if (user) { 
    const token = jwt.sign({ _id: user._id },
       process.env.JWT_SECRET || 'somethingsecret',
        {
      expiresIn: '3h',
    });
    user.resetToken = token;
    await user.save();

      console.log(`${baseUrl()}/reset-password/${token}`);
      
//How do I set up mailgun?
     /* mailgun()
      .messages()
      .send(
        {
          from: 'FitViper aryanbisen24@gmail.com>',
          to: `${user.firstName} ${user.lastName} <${user.email}>`,
          subject: `Reset Password`,
          html: ` 
           <p>Please Click the following link to reset your password:</p> 
           <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
           `,
        },
        (error: any, body: any) => {
          console.log(error);
          console.log(body);
        }
      );
    res.send({ message: 'We sent reset password link to your email.' });
  } else {
    res.status(404).send({ message: 'User not found' });
    */
  }
})
);

userRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET || 'somethingsecret', async (err: any, decode: any) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await UserModel.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Password reseted successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  }))