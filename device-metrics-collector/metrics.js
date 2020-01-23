
function MetricCollector(deviceMap) {
    var data = {},
        deviceMap = deviceMap;

    return {
        "parse": function(str) { /* Static */
            console.log(str);
            lines = str.split('\n');
            metrics = lines.map((line) => {
                var elems = line.split(' ');
                return { key: elems[0], value: Number(elems[1]) };
            })
            return metrics;
        },

        "putMetrics": function(id, metrics) {
            if(!deviceMap.exists(id)) {
                deviceMap.update(id, [ { name: "id", value: id} ]);
            }
            var tags = deviceMap.get(id);
            var tagged_metrics = metrics.map((m) => { m["tags"] = tags; return m; });
            console.log("Adding metrics for:", id, ", data is:", tagged_metrics)
            data[id] = tagged_metrics;
        },

        "getAllMetrics": function() {
            console.log("Getting all metrics")
            // Format is:
            /*
            Object.values({
                "herp-id": [
                    { key: "metric-name", value: 2.2, tags: [{name: "id", value: "herp-id"}] },
                    { key: "metric2-name", value: 2.2, tags: [{name: "id", value: "herp-id"}] },
                    { key: "metric3-name", value: 2.2, tags: [] },
                ]
            })
            */
           console.log("Metrics internal data is:", data)
            return Object
                .values(data)
                .reduce((acc,ms) => acc.concat(ms), []);;
        }
    }
}

module.exports = MetricCollector;
