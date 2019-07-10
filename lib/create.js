exports.start = (message) => {
    let createData = new message.schema[message.schemaName](message.content);
    return new Promise((resolve, reject) => {
        createData.save((err, data) => {
            if (err) {reject(err); return;}
            resolve(data);
        });
    });
}