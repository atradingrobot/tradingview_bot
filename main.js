const Koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const error_middleware = require('./middleware/error');

const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(error_middleware); // 错误处理中间件

app.use(router.routes());
app.use(router.allowedMethods()); // 路由中间件
app.use(bodyParser())

app.use(require('./routers/public').routes());
app.use(mount('/', serve(path.join(__dirname, "./static"))));

//////////////
//   配置   //
//////////////
app.host = process.env.IP || '0.0.0.0';
app.port = process.env.PORT || 80;

app.on('error', function (e) {});

const server = app.listen(app.port, app.host, () => {
    console.log(`TradingView Alert Bot server listening on ${server.address().address}:${server.address().port}`);
});
