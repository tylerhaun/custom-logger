const Transport = require('winston-transport');


class CustomConsoleTransport extends Transport {
  constructor(opts) {
    super(opts);
    }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const message = info[Symbol.for("message")];
    console.log(message);
    callback();
  }
};

module.exports = CustomConsoleTransport;
