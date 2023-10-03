const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('@routes/userRoutes');

const globalErrorHandler = require("@controllers/errorController")

const app = express();

if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors());

app.get('/', async (req, res) => {
   res.status(200).json({
      status: 'success',
      message: 'Server running successfully!'
   });
});

app.use('/api/users', userRouter);

app.use(globalErrorHandler)

module.exports = app;
