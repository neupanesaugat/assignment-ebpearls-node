import express from 'express';
import { isBlogger, isUser } from '../middleware/authentication.middleware.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import Blog from './blog.model.js';
import { blogValidationSchema } from './blog.validation.js';

const router = express.Router();

//* list all blogs
router.get('/list', isUser, async (req, res) => {
  // find all blogs
  const blogs = await Blog.find();
  return res.status(200).send({ message: 'success', blogList: blogs });
});

// //* add blog
router.post(
  '/add',
  isBlogger,
  validateRequestBody(blogValidationSchema),
  async (req, res) => {
    // extract newBlog from req.body
    const newBlog = req.body;
    newBlog.author = req.loggedInUserId;

    await Blog.create(newBlog);
    return res.status(201).send({ message: 'Blog added successfully' });
  }
);

export default router;
