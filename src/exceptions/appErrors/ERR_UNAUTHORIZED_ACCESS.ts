import { HttpCode, AppErrorArgs } from '../AppError';

const err: AppErrorArgs = {
  httpCode: HttpCode.UNAUTHORIZED,
  name: 'Error. Unauthorized access.',
};

export default err;
