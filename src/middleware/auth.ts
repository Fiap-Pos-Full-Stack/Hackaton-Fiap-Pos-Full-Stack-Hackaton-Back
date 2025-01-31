import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import IUser from "../interfaces/ITeacher";
import { roles } from '../enums/roles';

export interface CustomRequest extends Request {
    username?: string
    _id?: number
    role?: number
    token?: string
    page?:number
  }

  interface DecodedToken {
    _id: number
    username:string
    role: number
    token?:string
  }


  const auth = (req: CustomRequest, res: Response):DecodedToken => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      throw new Error(); 
    }
  
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken
        decoded.token = token
        return decoded
    }
    catch{
      throw new Error(); 
    }
  }
export const teacherMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
        const decoded = auth(req, res)
        if(decoded.role != roles.TEACHER)
        {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.username = decoded.username
        req.token = decoded.token
        req._id = decoded._id
        req.role = decoded.role
        next();
    }
    catch{
        return res.status(403).json({ message: 'Invalid token' });
    }

  };




  export const paramMiddleware = (role : number[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
      try{
        const decoded = auth(req, res)
        if(!role.includes(decoded.role))
        {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.username = decoded.username
        req.token = decoded.token
        req._id = decoded._id
        req.role = decoded.role
        next();
    }
    catch{
        return res.status(403).json({ message: 'Invalid token' });
    }
    }
  }