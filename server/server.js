const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errorMiddleware');
const serviceRouter = require('./router/serviceRouter');
const adminRouter = require('./router/adminRouter');

dotenv.config();
const cors = require('cors');


const app = express();
const authRouter = require('./router/authRouter');
const contactRouter = require('./router/contactRouter');
const connectDB = require('./utils/db');

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
  credentials: true,
};



app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
