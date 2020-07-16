
const { success, error,notice } = require('./util');

module.exports = async (ctx, next) => {
    ctx.success = success.bind(null, ctx);
    ctx.notice = notice.bind(null, ctx);
    ctx.error = error.bind(null, ctx);
    await next();
}
