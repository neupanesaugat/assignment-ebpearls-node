import express from 'express';
import {
  isBlogger,
  isUser,
  isViewer,
} from '../middleware/authentication.middleware.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import Blog from './blog.model.js';
import {
  blogPaginationValidationSchema,
  blogValidationSchema,
} from './blog.validation.js';

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

//* delete blog
router.delete('/delete/:id', isBlogger, async (req, res) => {
  const blogId = req.params.id;
  // find blog using blogId
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).send({ message: 'Blog does not exist' });
  }
  // check if loggedInUserId is the author of the blog
  if (blog.author.toString() !== req.loggedInUserId.toString()) {
    return res
      .status(403)
      .send({ message: 'You are not the author of this blog' });
  }
  // delete blog
  await Blog.findByIdAndDelete(blogId);
  return res.status(200).send({ message: 'Blog deleted successfully' });
});

//* edit blog
router.put(
  '/edit/:id',
  isBlogger,
  validateRequestBody(blogValidationSchema),
  async (req, res) => {
    const blogId = req.params.id;
    // find blog using blogId
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: 'Blog does not exist' });
    }
    // check if loggedInUserId is the author of the blog
    if (blog.author.toString() !== req.loggedInUserId.toString()) {
      return res
        .status(403)
        .send({ message: 'You are not the author of this blog' });
    }
    // extract new values from req.body
    const newValues = req.body;
    // edit blog
    await Blog.findByIdAndUpdate(blogId, newValues);
    return res
      .status(200)
      .send({ message: 'Blog has been edited successfully' });
  }
);

//* get blog details by id (only author can view)
router.get('/detail/:id', isBlogger, async (req, res) => {
  const blogId = req.params.id;
  // find blog using blogId
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).send({ message: 'Blog not found' });
  }
  // check if loggedInUserId is the author of the blog
  if (blog.author.toString() !== req.loggedInUserId.toString()) {
    return res
      .status(403)
      .send({ message: 'You are not the author of this blog' });
  }
  // send res
  return res.status(200).send({ message: 'Success!', blogDetails: blog });
});

//* list blogs by blogger (their own blogs, paginated, with search)
router.post(
  '/blogger/list',
  isBlogger,
  validateRequestBody(blogPaginationValidationSchema),
  async (req, res) => {
    const { page = 1, limit = 10, searchText } = req.body;
    const skip = (page - 1) * limit;
    let match = { author: req.loggedInUserId };
    if (searchText) {
      match.title = { $regex: searchText, $options: 'i' }; //? search by the product name and convert it in small letters
    }
    const blogs = await Blog.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          category: 1,
          image: 1,
          createdDate: 1,
          description: { $substr: ['$description', 0, 200] }, //? in order to display only 200 characters
        },
      },
    ]);
    return res.status(200).send({ message: 'success', blogList: blogs });
  }
);

//* list blogs for viewers (paginated, with search)
router.post(
  '/viewer/list',
  isViewer,
  validateRequestBody(blogPaginationValidationSchema),
  async (req, res) => {
    const { page = 1, limit = 10, searchText } = req.body;
    const skip = (page - 1) * limit;
    let match = {};
    if (searchText) {
      match.title = { $regex: searchText, $options: 'i' };
    }
    const blogs = await Blog.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          category: 1,
          image: 1,
          createdDate: 1,
          description: { $substr: ['$description', 0, 200] },
        },
      },
    ]);
    return res.status(200).send({ message: 'success', blogList: blogs });
  }
);

export default router;
