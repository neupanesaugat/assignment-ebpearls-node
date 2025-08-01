import express from 'express';
import connectDB from './database-connect/db.connect.js';
import userRoutes from './user/user.controller.js';

const app = express();

// make app use  json
app.use(express.json());

// set routes
app.use('/user', userRoutes);

//connect DB
await connectDB();

const PORT = process.env.PORT; //? extracting port from env object to hide PORT number from github

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
