module.exports = async function (ctx, next) {
    try {
        await next(); // next 是一个函数，用 await 替代 yield
    } catch (e) {
        let _body = {
            ret: -99,
            e: e,
            msg: e.message,
            stack: e.stack,
            status: e.status
        };
        ctx.body = _body;
        ctx.status = 200;
    }
};
