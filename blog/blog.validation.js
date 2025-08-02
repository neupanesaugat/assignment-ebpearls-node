import Yup from 'yup';
import {
  blogCategories,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '../constant/general.constant.js';

export const blogValidationSchema = Yup.object({
  title: Yup.string().required().trim().max(120),
  description: Yup.string().required().trim().min(10).max(5000),
  category: Yup.string().trim().required().oneOf(blogCategories),
  author: Yup.string().required(), // Should be a valid ObjectId, can add regex if needed
  image: Yup.string().url().nullable(),
  tags: Yup.array().of(Yup.string().trim()),
  comments: Yup.array().of(
    Yup.object({
      user: Yup.string().required(), // Should be a valid ObjectId
      comment: Yup.string().required().trim(),
      date: Yup.date(),
    })
  ),
});

export const blogPaginationValidationSchema = Yup.object({
  page: Yup.number().min(1).integer().default(DEFAULT_PAGE),
  limit: Yup.number().min(1).integer().default(DEFAULT_LIMIT),
  searchText: Yup.string().trim().notRequired(),
  category: Yup.string().oneOf(blogCategories).notRequired(),
  author: Yup.string().notRequired(),
});
