"use strict";

/*
  Instantiating a writable stream from the Writable class.

  Generating an error (decodeString = false only accepts strings or Buffers to be written to the stream)
*/

const { Writable } = require("stream");

const createWriteStream = (data) => {
  return new Writable({
    decodeStrings: false,
    write(chunk, enc, next) {
      data.push(chunk);
      next();
    },
  });
};

const data = [];

const writable = createWriteStream(data);

writable.on("finish", () => {
  console.log("finished writing", data);
});

writable.write("A\n");
writable.write(1);
writable.end("nothing more to write");
