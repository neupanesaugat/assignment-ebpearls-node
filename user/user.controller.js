import bcrypt from 'bcrypt';
import express from 'express';
import User from './user.model.js';
import {
  loginUserValidationSchema,
  userValidationSchema,
} from './user.validation.js';

import jwt from 'jsonwebtoken';

import { isAdmin, isUser } from '../middleware/authentication.middleware.js';
import validateRequestBody from '../middleware/validate.req.body.js';

import { validateObjectId } from '../middleware/validate.mongo.objectid.js';

const router = express.Router();

//* register user
router.post(
  '/register',
  //? validate user
  validateRequestBody(userValidationSchema),

  //? register new user
  async (req, res) => {
    // extract data from req.body
    const newUser = req.body;

    // find the user with email
    const user = await User.findOne({ email: newUser.email });

    // if user exist, throw error
    if (user) {
      return res.status(409).send({ message: 'User already exists' });
    }

    // hash password
    const plainPassword = newUser.password;
    const saltRound = 10;

    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    newUser.password = hashedPassword;

    // send to DB
    await User.create(newUser);

    // send res
    return res
      .status(200)
      .send({ message: 'User Registered successfully', userDetail: newUser });
  }
);

//* login
router.post(
  '/login',
  //? validate login credentials
  validateRequestBody(loginUserValidationSchema),

  //? login user
  async (req, res) => {
    // extract loginCredentials from req.body
    const loginCredentials = req.body;

    // find user using email
    const user = await User.findOne({ email: loginCredentials.email });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: 'Invalid Credentials' });
    }

    // compare password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const password = await bcrypt.compare(plainPassword, hashedPassword);

    // if password don't match, throw error
    if (!password) {
      return res.status(404).send({ message: 'Invalid Credentials' });
    }

    // generate token
    const payload = { email: user.email };
    const secretKey = 'saugatkey';
    const token = await jwt.sign(payload, secretKey);

    // send res
    return res.status(200).send({
      message: 'Login successful !',
      userDetail: user,
      accessToken: token,
    });
  }
);

//* delete user by id (admin only)
router.delete('/delete/:id', isAdmin, validateObjectId, async (req, res) => {
  // extract product id from req.params
  const userId = req.params.id;

  // find user using userId
  const user = await User.findById(userId);

  // if not user found, throw error
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' });
  }

  // delete user
  await User.findByIdAndDelete(userId);

  // send res
  return res.status(200).send({ message: 'Success!' });
});

//* get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send({ users });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch users', error: error.message });
  }
});

//* get current logged-in user (protected)
router.get('/me', isUser, async (req, res) => {
  try {
    const user = await User.findById(req.loggedInUserId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch user', error: error.message });
  }
});

//* get user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch user', error: error.message });
  }
});

//* update user by id
router.put(
  '/update/:id',
  isUser,
  validateRequestBody(userValidationSchema),
  async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      // Only allow the logged-in user to update their own account
      if (req.loggedInUserId.toString() !== id) {
        return res
          .status(403)
          .send({ message: 'You can only update your own account.' });
      }
      // If password is being updated, hash it
      if (updates.password) {
        const saltRound = 10;
        updates.password = await bcrypt.hash(updates.password, saltRound);
      }
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send({
        message: 'User updated successfully',
        userDetail: updatedUser,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Failed to update user', error: error.message });
    }
  }
);

//* get current logged-in user (protected)
router.get('/me', isUser, async (req, res) => {
  try {
    const user = await User.findById(req.loggedInUserId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch user', error: error.message });
  }
});
export default router;
