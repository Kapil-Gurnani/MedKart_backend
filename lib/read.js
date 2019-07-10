exports.start = (message) => {
    return new Promise((resolve, reject) => {
        message.schema[message.schemaName].find((err, data) => {
            if (err) {reject(err); return;}
            resolve(data);
        });
    });
}