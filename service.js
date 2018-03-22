const Koa = require('koa');
const Http = require('http');
const html = require('./index')()
// import html from './index'
// 创建一个Koa对象表示web app本身:

const app = new Koa();
let HTML
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.header = 'charset=GBK'
    ctx.response.type = 'text/html;charset=GBK';
    ctx.response.body = HTML;
});
app.use(async (ctx, next) => {
    await next();
    await html.then(res => HTML = res)

    //
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');