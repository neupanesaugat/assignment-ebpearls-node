# Assignment API (MERN Stack)

A Node.js RESTful API for managing users and assignments, built with Express and MongoDB (Mongoose). Features include user authentication, assignment CRUD, comments, and tags.

## Features

- User registration and login (with JWT authentication)
- CRUD operations for users and assignments
- Assignment model supports comments and tags
- Validation for required fields
- Protected endpoint to get the currently logged-in user

## Prerequisites

- Node.js (v16 or above recommended)
- MongoDB Atlas or local MongoDB instance

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
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
- `PUT /user/update/:id` — Update user by ID
- `DELETE /user/delete/:id` — Delete user by ID
- `GET /user/me` — Get currently logged-in user (requires Bearer token)

### Assignment Endpoints

- `POST /assignments/create` — Create a new assignment (title, description required; comments, tags optional)
- `GET /assignments/all` — Get all assignments
- `GET /assignments/:id` — Get assignment by ID
- `PUT /assignments/:id` — Update assignment by ID (title, description required; comments, tags optional)
- `DELETE /assignments/delete/:id` — Delete assignment by ID

## Usage

- Use Postman or similar tools to test API endpoints.
- For protected endpoints, include the JWT token in the `Authorization` header as `Bearer <token>`.

## Project Structure

```
assignment-api/
├── assignment.model.js
├── assignment.controller.js
├── user/
│   ├── user.model.js
│   ├── user.controller.js
│   ├── user.validation.js
├── database-connect/
│   └── db.connect.js
├── middleware/
│   └── validate.req.body.js
├── index.js
├── package.json
└── .env
```

## License

MIT
# assignment-ebpearls-node
