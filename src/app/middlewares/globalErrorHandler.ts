/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationEroor';
import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`)
    : console.log(`🐱‍🏍 production`);

  let statusCode = 500;

  let message = 'Something went wrong';

  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simpleError = handleValidationError(error);

    errorMessages = simpleError.errorMessages;

    statusCode = simpleError.statusCode;
    message = simpleError.message;
  } else if (error?.name === 'CastError') {
    const simpleError = handleCastError(error);

    errorMessages = simpleError.errorMessages;

    statusCode = simpleError.statusCode;
    message = simpleError.message;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;

    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    statusCode,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
