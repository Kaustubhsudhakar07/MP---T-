const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const authRouter = require('./router/authRouter');
const connectDB = require('./utils/db');

app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
