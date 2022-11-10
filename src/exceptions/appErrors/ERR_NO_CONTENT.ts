import { HttpCode, AppErrorArgs } from '../AppError';

const err: AppErrorArgs = {
  httpCode: HttpCode.NO_CONTENT,
  name: 'Error. No Content here.',
};

export default err;
