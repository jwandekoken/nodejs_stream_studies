"use strict";

/*
  Instantiating a writable stream from the Writable class.

  Using decodeStrings as false. This opts out from the objectMode default value of false.
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
writable.write("B\n");
writable.write("C\n");
writable.end("nothing more to write");
