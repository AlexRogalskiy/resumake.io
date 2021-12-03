import { isHttpError, Middleware, Status } from 'oak';

export function errorHandler(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        switch (err.status) {
          case Status.NotFound:
            ctx.response.status = 404;
            ctx.response.body = 'Resource not found';
            break;
          default:
            ctx.response.status = err.status;
            ctx.response.body = 'Unable to process request';
            break;
        }
      } else {
        console.error(err);
        ctx.response.status = 500;
        ctx.response.body = 'Something went wrong';
      }
    }
  };
}
