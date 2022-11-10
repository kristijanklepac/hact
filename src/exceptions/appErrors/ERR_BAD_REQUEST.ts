import { HttpCode, AppErrorArgs } from '../AppError';

const err: AppErrorArgs = {
  httpCode: HttpCode.BAD_REQUEST,
  name: 'Error. Bad Request.',
};

export default err;
