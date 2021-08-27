"use strict";

/*
  Instantiating a writable stream from the Writable class.

  If we want to support strings and any other JavaScript value, we can instead set objectMode to true to create an object-mode writable stream
*/

const { Writable } = require("stream");

const createWriteStream = (data) => {
  return new Writable({
    objectMode: true,
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
