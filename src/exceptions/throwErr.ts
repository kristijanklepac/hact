/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLFormattedError } from 'graphql';
import { AppError, AppErrorArgs } from './AppError';
import { HasuraError } from './HasuraError';

export const isTypicalHasuraError = (
  obj: any,
): obj is GraphQLFormattedError[] => {
  // if we have message && extensions on index 0 we assume it's typical Hasura Error
  if (Array.isArray(obj) && obj.length > 0)
    return (
      'message' in obj[0] &&
      'extensions' in obj[0] &&
      'path' in obj[0].extensions &&
      'code' in obj[0].extensions
    );

  return false;
};
export const isTypicalAppError = (obj: any): obj is AppErrorArgs => {
  // if we have message && code on obj we assume it's typical App Error
  return 'name' in obj && 'httpCode' in obj;
};

export const throwErr = (error: GraphQLFormattedError[] | AppErrorArgs) => {
  // throw err

  if (isTypicalHasuraError(error)) {
    throw new HasuraError(error);
  }

  if (isTypicalAppError(error)) {
    throw new AppError(error);
  }

  // default return
  throw new Error('Something went wrong!');
};
