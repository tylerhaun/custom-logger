const Transport = require('winston-transport');
const winston = require("winston")
require('winston-mongodb');

const CustomConsoleTransport = require("./CustomConsoleTransport");
const winstonMongoMetadataFormat = require("./winston-mongo-metadata-format");


const defaultLevel = "trace";


const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    fatal: 'black',
    error: 'red',
    warn: 'yellow',
    info: 'grey',
    debug: 'green',
    trace: 'magenta'
  }
};


winston.addColors(customLevels.colors);


const defaultMeta = {
  level: defaultLevel,
};
try {
  Object.assign(defaultMeta, JSON.parse(process.env.LOGGER_DEFAULT_META_JSON))
}
catch(e) {}


var format = winston.format.combine(
  winston.format.json(),
  winstonMongoMetadataFormat(),
);
if (process.env.LOGGER_COLORIZE == "true") {
  format = winston.format.combine(
    winston.format.json(),
    winston.format.colorize({all: true}),
    winstonMongoMetadataFormat(),
  )
}


const logger = winston.createLogger({
  level: defaultLevel,
  levels: customLevels.levels,
  format,
  defaultMeta,
});


if (process.env.LOGGER_CONSOLE_TRANSPORT !== "false") {
  logger.add(new CustomConsoleTransport({}));
}

const mongoUrl = process.env.LOGGER_MONGO_URL;
if (mongoUrl) {
  const mongoOptions = {
    db: process.env.LOGGER_MONGO_URL,
    metaKey: Symbol.for("metadata"),
    level: defaultLevel,
  };
  const mongoTransport = new winston.transports.MongoDB(mongoOptions)
  logger.add(mongoTransport);
}


module.exports = logger;

