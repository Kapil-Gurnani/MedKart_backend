exports.start = (message) => {
    return new Promise((resolve, reject) => {
        message.schema[message.schemaName].findByIdAndUpdate(message.content.id, message.content, (err, data) => {
            if (err) {reject(err); return;}
            resolve(data);
        });
    });
}