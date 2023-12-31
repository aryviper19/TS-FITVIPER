import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from './models/userModel'




export const baseUrl= () =>
process.env.BASE_URL
? process.env.BASE_URL
: process.env.NODE_ENV !== 'production'
? 'http://localhost:3000'
// my own domain
: 'https://fitviper.onrender.com'
export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '1000d',
    }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length) // Bearer xxxxx
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    )
    req.user = decode as {
      _id: string
      firstName: string
      lastName: string
      email: string
      isAdmin: boolean
      token: string
    }
    next()
  } else {
    res.status(401).json({ message: 'No Token' })
  }
}
