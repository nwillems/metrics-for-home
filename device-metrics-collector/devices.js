
function DeviceMapper(deviceMap) {
    var data = deviceMap || {};

    return {
        "exists": (id) => { return data.hasOwnProperty(id); },
        "update": (id, initialTags) => { 
            data[id] = initialTags;
         },
        "get": (id) => {
            return data[id];
        },
        "getAll": () => { return data; }
    }
}

module.exports = DeviceMapper
