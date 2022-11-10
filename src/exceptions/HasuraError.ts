import { HttpCode } from './AppError';
import { GraphQLFormattedError } from 'graphql';

export class HasuraError extends Error {
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;
  public readonly errors: GraphQLFormattedError[];

  constructor(args: GraphQLFormattedError[]) {
    super(
      args
        .map(function (item) {
          return item['message'];
        })
        .join(', '),
    );

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'Error from Hasura GraphQL';
    this.httpCode = HttpCode.BAD_REQUEST;
    this.isOperational = true;

    this.errors = args;

    Error.captureStackTrace(this);
  }
}
