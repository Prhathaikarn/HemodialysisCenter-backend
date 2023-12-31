require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const authRoute = require('./routes/auth-route');
const patientRoute = require('./routes/patient-route');
const authenticate = require('./middlewares/authenticate');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 1000,
    message: { message: 'too many requests!!!!' },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/patient', authenticate, patientRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, () =>
  console.log('Server running on port ' + process.env.PORT)
);
