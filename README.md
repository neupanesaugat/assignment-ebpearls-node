# Blog Management System API

A Node.js RESTful API for managing users and blogs, built with Express and MongoDB (Mongoose). Features include user authentication, role-based access, blog CRUD, comments, tags, and advanced listing for bloggers and viewers.

## Features

- User registration and login (with JWT authentication)
- Role-based access: admin, blogger, viewer
- CRUD operations for users and blogs
- Blog model supports comments and tags
- Validation for required fields using Yup
- Protected endpoints for different user roles
- Paginated and searchable blog listing for bloggers and viewers

## Prerequisites

- Node.js (v16 or above recommended)
- MongoDB Atlas or local MongoDB instance

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/neupanesaugat/assignment-ebpearls-node.git
   cd assignment-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following:

   ```env
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_OPTIONS=retryWrites=true&w=majority
   ACCESS_TOKEN_SECRET_KEY=your_jwt_secret
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### User Endpoints

- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive JWT token
- `GET /user/all` — Get all users
- `GET /user/:id` — Get user by ID
- `PUT /user/update/:id` — Update user by ID (only the user themself)
- `DELETE /user/delete/:id` — Delete user by ID (admin only)
- `GET /user/me` — Get currently logged-in user (requires Bearer token)

### Blog Endpoints

- `GET /blog/list` — List all blogs (authenticated users)
- `POST /blog/add` — Add a new blog (blogger only)
- `PUT /blog/edit/:id` — Edit a blog (only the author/blogger)
- `DELETE /blog/delete/:id` — Delete a blog (only the author/blogger)
- `GET /blog/detail/:id` — Get blog details by ID (only the author/blogger)
- `POST /blog/blogger/list` — Blogger's own blogs (paginated, with search)
- `POST /blog/viewer/list` — View all blogs as a viewer (paginated, with search)

## Usage

- Use Postman or similar tools to test API endpoints.
- For protected endpoints, include the JWT token in the `Authorization` header as `Bearer <token>`.
- Use the correct role to access role-protected endpoints (admin, blogger, viewer).

## Project Structure

```
assignment-api/
├── blog/
│   ├── blog.model.js
│   ├── blog.controller.js
│   ├── blog.validation.js
├── user/
│   ├── user.model.js
│   ├── user.controller.js
│   ├── user.validation.js
├── database-connect/
│   └── db.connect.js
├── middleware/
│   ├── authentication.middleware.js
│   ├── validate.req.body.js
│   └── validate.mongo.objectid.js
├── utils/
│   └── mongo.id.equality.js
├── index.js
├── package.json
└── .env
```

## License

MIT
