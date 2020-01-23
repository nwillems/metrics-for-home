const Koa = require('koa');

var app = new Koa()

var Router = require('./router'),
    DeviceMapper = require('./devices'),
    MetricsCollector = require('./metrics');

var initialDeviceMap = {
    "device1": [ {name: "id", value: "device1"} ],
    "device2": [ {name: "id", value: "device2"}, {name: "location", value: "living room"} ],
    "device3": [ {name: "id", value: "device2"}, {name: "name", value: "Livingroom sensor"}, {name: "location", value: "living room"} ]
}

var device_mapper = new DeviceMapper(initialDeviceMap), /* Consider if we should persist the device-mapping */
    metrics_collector = new MetricsCollector(device_mapper); // new DeviceMapper(data_store);

var router = new Router( metrics_collector, device_mapper );
console.log(router);

app.use(router.routes())
   .use(router.allowedMethods());

console.log(app)

app.listen(8000, function(){
    console.log("Now serving devide metrics on :8000")
})
