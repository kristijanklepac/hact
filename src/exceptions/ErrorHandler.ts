import { Response } from 'express';
import { AppError, HttpCode } from './AppError';
import { HasuraError } from './HasuraError';
import { exitHandler } from '../ExitHandler';
import Logger from '../logger';

// The standard error handling mechanism from GraphQL with return a JSON containing:

// a data key which contains the data corresponding to the GraphQL operation (query, mutation, subscription) invoked and
// an errors key which contains an array of errors returned by the server, with a message and location.

// {
//   "errors": [
//     {
//       "message": "User not found",
//       "locations": [{ "line": 6, "column": 7 }],
//       "path": ["user", 1]
//     }
//   ]
// }

class ErrorHandler {
  public handleError(
    error: Error | AppError | HasuraError,
    response?: Response,
  ): void {
    if (this.isTrustedError(error) && response) {
      if (error instanceof AppError) {
        this.handleTrustedError(error as AppError, response);
      }

      if (error instanceof HasuraError) {
        this.handleHasuraTrustedError(error as HasuraError, response);
      }
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    if (error instanceof HasuraError) {
      return true;
    }

    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    const hasuraLookError = {
      errors: [
        {
          extensions: {
            path: '',
            code: `error.httpCode: ${error.httpCode}`,
          },
          message: error.name,
        },
      ],
    };
    response.status(error.httpCode).json({ ...hasuraLookError });
  }

  private handleHasuraTrustedError(
    error: HasuraError,
    response: Response,
  ): void {
    response.status(error.httpCode).json({ errors: [...error.errors] });
  }

  private handleUntrustedError(
    error: Error | AppError | HasuraError,
    response?: Response,
  ): void {
    if (response) {
      const hasuraLookError = {
        errors: [
          {
            extensions: {
              path: '',
              code: `error.httpCode: ${HttpCode.INTERNAL_SERVER_ERROR}`,
            },
            message: error?.message ?? 'Internal Server Error',
          },
        ],
      };
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ ...hasuraLookError });
    }

    Logger.info('Application encountered an untrusted error.');
    Logger.info(error);
    exitHandler.handleExit(1);
  }
}

export const errorHandler = new ErrorHandler();
