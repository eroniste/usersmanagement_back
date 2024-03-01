import express from 'express';
import PersonModel from "../db/users";
import { getUsers } from '../db/users';
import { result, update } from 'lodash';
import users from 'router/users';
import { ObjectId } from 'mongoose';
import { request,Response, NextFunction } from 'express';
import cloudinary from 'utils/cloudinary';

export const addAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const { firstName, lastName, email, phone, birthDate, username, image } = req.body;
    //   const result = await cloudinary.v2.uploader.upload(image, {
    //     folder: "users_img"
    // });
  
      // Create a new Person document using the Person model
      const newAdmin = new PersonModel({
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        username,
        image,
      });
  
      // Save the new user to the database
      await newAdmin.save();

      res.status(201).json(newAdmin); // Respond with the newly created user
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  };