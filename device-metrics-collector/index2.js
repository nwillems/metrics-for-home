const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('@koa/router');
const mount = require('koa-mount');
const logger = require('koa-logger');

var app = new Koa();

var router = new KoaRouter();
var static = KoaStatic('./static/', {defer: true});
router.get('/foo', async (ctx) => ctx.body = "Hello, from router");

router.get('/*', static);
//console.log(router);

app.use(router.routes())
   // .use(router.allowedMethods());

app.use(logger);
app.listen(8000);
