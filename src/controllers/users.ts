import express from 'express';
import PersonModel from "../db/users";
import { getUsers } from '../db/users';
import { result, update } from 'lodash';
import users from 'router/users';
import { ObjectId } from 'mongoose';
import { request,Response, NextFunction } from 'express';


interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
}

export interface usersPage {
  results: (Person & { _id: ObjectId; })[],
  next: string | null,
  previous: string | null,
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
      const users = await getUsers();
  
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };


  export const getUserList = async (req: express.Request, res: express.Response): Promise<usersPage> => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 5;
      const offset = parseInt(req.query.page as string, 10) || 1;
      const searchTerm = req.query.searchTerm ? String(req.query.searchTerm) : '';
      const filter = {
        $or: [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          {email:{$regex: searchTerm, $options: 'i'}}
        ],
      };

      const userListQuery = PersonModel.find(filter).skip((offset-1)*limit).limit(limit);
      const totalCount = await PersonModel.countDocuments();
      const totalPage = Math.ceil(totalCount / limit);
      
      

  
      const userList = await userListQuery;
  
      // Transform user data into userPage format
      
  
      const nextOffset = offset + limit;
      const previousOffset = offset - limit < 0 ? null : offset - limit;

      res.json({
        results:userList,
        totalPage      
      });
      return {
        results :userList,
        next: nextOffset < totalCount ? `/users?limit=${limit}&offset=${nextOffset}` : null,
        previous: previousOffset !== null ? `/users?limit=${limit}&offset=${previousOffset}` : null,
      }
  
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  export const addUsers = async (req: express.Request, res: express.Response) => {
    try {
      const { firstName, lastName, email, phone, birthDate, username } = req.body;
  
      // Create a new Person document using the Person model
      const newUser = new PersonModel({
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        username,
      });
  
      // Save the new user to the database
      await newUser.save();

      res.status(201).json(newUser); // Respond with the newly created user
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  };
  export const deleteUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID and delete them from the database
        const deletedUser = await PersonModel.findByIdAndDelete(userId);

        // If the user is not found, return a 404 response
        if (!deletedUser) {
            return res.status(600).json({ message:'not done'});
        }

        // If the user is successfully deleted, return a success message
        return res.status(200).json({ message:'success' });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error deleting user:', error);
        return res.status(500);
    }
  };

  export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = req.params.userId;
    const user = await PersonModel.findById(userId)
    if (!user) {
      return res.status(600).json({Message: 'Listing not found!'});
    }
    try {
      const updatedUser = await PersonModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }



  }