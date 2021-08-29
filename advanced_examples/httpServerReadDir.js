"use strict";
const { createServer } = require("http");
const { Readable, Transform, pipeline } = require("stream");
const { opendir } = require("fs");

/*
  Some more advanced options are passed to the Transform stream constructor, writableObjectMode and readableObjectMode allow for the objectMode to be set for the read and write interfaces separately. The writableObjectMode is set to true because dirStream is an object stream. The readableObjectMode is set to false because res is a binary stream. So our entryStream can be piped to from an object stream, but can pipe to a binary stream.
*/

const createEntryStream = () => {
  let syntax = "[\n";
  return new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(entry, enc, next) {
      next(null, `${syntax} "${entry.name}"`);
      syntax = ",\n";
    },
    final(cb) {
      this.push("\n]\n");
      cb();
    },
  });
};

createServer((req, res) => {
  if (req.url !== "/") {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }
  opendir(__dirname, (err, dir) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server Error");
      return;
    }
    const dirStream = Readable.from(dir);
    const entryStream = createEntryStream();
    res.setHeader("Content-Type", "application/json");
    pipeline(dirStream, entryStream, res, (err) => {
      if (err) console.error(err);
    });
  });
}).listen(3000);
