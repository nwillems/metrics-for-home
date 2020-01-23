
const KoaRouter = require('@koa/router');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');

function formatMetricsLine(metric){
    var metric_name = metric.key,
        metric_value = metric.value;

    if (metric.tags) {
        var tags = metric.tags.map((tag) => `${tag.name}="${tag.value}"`).join(",");
        return `${metric_name}{${tags}} ${metric_value}\n`;
    } else {
        return `${metric_name} ${metric_value}\n`;
    }
}

function Router( metrics, devices ){
    var router = new KoaRouter();

    router.get('/metrics', (ctx) => {
        console.log("Serving up all metrics")
        var allMetrics = metrics.getAllMetrics();

        console.log(allMetrics)

        if (allMetrics.length > 0){
            // Intended format: http_requests_total{method="post",code="200"} 1027 1395066363000
            ctx.body = allMetrics.reduce( (acc,element) => { return acc + formatMetricsLine(element); }, "");
        } else {
            ctx.body = "no_metrics 1";
        }
    });

    router.put('/metrics/:id', KoaBody(), (ctx) => {
        var request_body = ctx.request.body;
        var id = ctx.params.id

        var parsed_metrics = metrics.parse(request_body);
        metrics.putMetrics(id, parsed_metrics);

        // Do something about response
        ctx.body = "OK"
    });

    router.get('/devices', (ctx) => {
        ctx.body = JSON.stringify(devices.getAll());
    });
    router.put('/devices/:id', KoaBody(), (ctx) => {
        devices.update(ctx.params.id, ctx.request.body)
        ctx.body = "OK";
    });

    var assets = KoaStatic('./static/');
    router.get('/*', assets);

    return router;
}

module.exports = Router
