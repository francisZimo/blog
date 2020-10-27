const Koa = require('./like-koa2');
const app = new Koa();

// logger

app.use(async(ctx, next) => {
    console.log('开始 111')
    await next();
    console.log('结束 111')
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

// x-response-time

app.use(async(ctx, next) => {
    const start = Date.now();
    console.log('开始 222')
    await next();
    console.log('结束 222')
    const ms = Date.now() - start;
    // ctx.set('X-Response-Time', `${ms}ms`);
    ctx['X-Response-Time'] = `${ms}ms`;
});

// response

app.use(async ctx => {
    console.log('开始333')
    ctx.res.end('Hello World')
    console.log('结束333')
});

app.listen(3000);