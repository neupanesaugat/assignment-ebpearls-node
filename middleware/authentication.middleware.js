import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

// Middleware to check if the user is authenticated
export const isUser = async (req, res, next) => {
  try {
    // extract token from req.headers

    const { authorization } = req.headers;

    const splittedArray = authorization?.split(' ');

    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if not token ,throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = 'saugatkey';

    //  verify token
    const payload = jwt.verify(token, secretKey);

    // find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user found, throw error
    if (!user) {
      throw new Error();
    }

    // attach user._id to req
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

// Middleware to check if the user is a blogger
export const isBlogger = async (req, res, next) => {
  try {
    // extract token from req.headers

    const { authorization } = req.headers;

    const splittedArray = authorization?.split(' ');

    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if not token ,throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = 'saugatkey';

    //  verify token
    const payload = jwt.verify(token, secretKey);

    // find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user found, throw error
    if (!user) {
      throw new Error();
    }

    // check if user role is "blogger"
    //  if user role is not "blogger", throw error
    if (user.role !== 'blogger') {
      throw new Error();
    }

    // attach user._id to req
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

// Middleware to check if the user is a viewer
export const isViewer = async (req, res, next) => {
  try {
    // extract token from req.headers

    const { authorization } = req.headers;

    const splittedArray = authorization?.split(' ');

    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if not token ,throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = 'saugatkey';

    //  verify token
    const payload = jwt.verify(token, secretKey);

    // find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user found, throw error
    if (!user) {
      throw new Error();
    }

    // check if user role is "viewer"
    //  if user role is not "viewer", throw error
    if (user.role !== 'viewer') {
      throw new Error();
    }

    // attach user._id to req
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    // extract token from req.headers
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(' ');
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;
    // if not token ,throw error
    if (!token) {
      throw new Error();
    }
    const secretKey = 'saugatkey';
    //  verify token
    const payload = jwt.verify(token, secretKey);
    // find user using email from payload
    const user = await User.findOne({ email: payload.email });
    // if not user found, throw error
    if (!user) {
      throw new Error();
    }
    // check if user role is "admin"
    //  if user role is not "admin", throw error
    if (user.role !== 'admin') {
      throw new Error();
    }
    // attach user._id to req
    req.loggedInUserId = user._id;
    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};
