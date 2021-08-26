const winston = require("winston")


const winstonMongoMetadataFormat = winston.format((info, opts) => {
  try {
    info[Symbol.for("metadata")] = JSON.parse(JSON.stringify(info));
    return info;
  }
  catch(e) {
    console.error(e);
    return info;
  }
})

module.exports = winstonMongoMetadataFormat;
