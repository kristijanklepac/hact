import { HttpCode, AppErrorArgs } from '../AppError';

const err: AppErrorArgs = {
  httpCode: HttpCode.NOT_FOUND,
  name: 'Error. Not Found.',
};

export default err;
