import mongoose from 'mongoose';
import { blogCategories } from '../constant/general.constant.js';

// Blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: blogCategories,
    },
    author: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      default: null,
    },
    createdDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    comments: [
      {
        user: { type: mongoose.ObjectId, ref: 'User' },
        comment: { type: String, required: true, trim: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// create model/collection
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
