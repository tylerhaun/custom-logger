process.env.LOGGER_MONGO_URL = "mongodb://localhost:27017/test-logger";
process.env.LOGGER_DEFAULT_META_JSON = '{"test": "test"}';
//process.env.LOGGER_CONSOLE_TRANSPORT = "false";
process.env.LOGGER_COLORIZE = "true";
const logger = require("../src");

logger.log({message: "test message"})

