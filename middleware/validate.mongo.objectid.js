import { isValidObjectId } from 'mongoose';

// Middleware to validate MongoDB ObjectId
export function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: 'Invalid user id' });
  }
  next();
}
