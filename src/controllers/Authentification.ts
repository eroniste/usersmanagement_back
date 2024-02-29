import Admin from '../db/admin';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/erroHandeler';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction} from 'express';



export const signup = async (req: express.Request, res: express.Response, next: (arg0: any) => void) => {
  const { username, email, password } = req.body;  
  const saltRounds = 10;
  try {
    if (!password) {
      throw new Error('Password is required');
    }
    const hashedPassword = bcryptjs.hashSync(password, saltRounds);
    const newAdmin = new Admin({ username: username, email: email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};


export const signin = async (req: express.Request, res: express.Response, next: (arg0: any) => void) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    
    
    const token = jwt.sign({ id: validAdmin._id, email: validAdmin.email }, process.env.JWT_SECRET);
    
    const { password: pass, ...rest } = validAdmin;
    console.log(validAdmin)
    res.status(200).json({'access_token': token});
  } catch (error) {
    next(error);
  }
  
};
const JWT_SECRET="ILYSSSBOUL";

// export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
//   // Extract the Authorization header from the request
//   const authHeader = req.headers['authorization'];

//   // Check if Authorization header exists and has the expected format
//   if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
//     // Extract the token part after 'Bearer '
//     const token = authHeader.slice(7);

//     try {
//       // Verify the token and extract the username from the payload
//       const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
//       const { username } = decoded;

//       // Attach the user data to the request object for future middleware
//       req.currentUser = { username }; // Adjust the assignment as needed

//       // Continue with the next middleware
//       next();
//     } catch (error) {
//       // Handle token verification errors
//       console.error('Token verification failed:', error.message);
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//   } else {
//     // No Authorization header or incorrect format
//     return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
//   }
// };
export const currentUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
 
  console.log("nooo") // Retrieve token from local storage
      // Continue with token processing...
  
};


  // Check if token exists in local storage





