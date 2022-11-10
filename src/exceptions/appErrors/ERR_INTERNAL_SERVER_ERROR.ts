import { HttpCode, AppErrorArgs } from '../AppError';

const err: AppErrorArgs = {
  httpCode: HttpCode.INTERNAL_SERVER_ERROR,
  name: 'Internal Server Error',
};

export default err;
