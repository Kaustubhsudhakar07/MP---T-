const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
const authRouter = require('./router/authRouter');
const contactRouter = require('./router/contactRouter');
const connectDB = require('./utils/db');


app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
