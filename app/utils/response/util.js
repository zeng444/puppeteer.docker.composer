
'use strict';

const defaultResponse = {
  data: '',
  status: {
    code: 0,
    message: 'success'
  }
};

/**
 * response
 * @param ctx
 * @param data 数据
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
const response = (ctx, data, message, code , status) => {
  if (typeof code == 'object') {
    message = code[1];
    code = code[0];
  }
  ctx.body = {
    data,
    code,
    message,
    status
  }
}

/**
 * response 成功
 * @param ctx
 * @param data 数据
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
exports.success = (ctx, data = '', message = '', code = 200, status='success') => {
  response(ctx, data, message, code , status);
}
/**
 * response 提示
 * @param ctx
 * @param data 数据
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
exports.notice = (ctx, message = '', code = 400, status='error',data = '',) => {
  response(ctx, data, message, code , status);
}
/**
 * response 异常
 * @param ctx
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
exports.error = (ctx, code = 1, message = 'error') => {
  if (typeof code === 'object') {
    message = code[1];
    code = code[0];
  }
  response(ctx, defaultResponse.data, code, message);
}