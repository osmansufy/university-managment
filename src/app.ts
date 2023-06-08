import express, { Application, NextFunction, Request, Response } from 'express';

import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global error handler

app.use(globalErrorHandler);

//Testing
app.get('/', () => {
  throw new Error('test error');
});

// handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Not Found',
      },
    ],
  });
  next();
});

export default app;
