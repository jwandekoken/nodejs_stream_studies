"use strict";

/*
  instantiating a read stream from Readable class, passing an encoding option (UTF8).
  
  Note that now when each data event is emitted it receives a string instead of a buffer. However because the default stream mode is objectMode: false, the string is pushed to the readable stream, converted to a buffer and then decoded to a string using UTF8
*/

const { Readable } = require("stream");

const createReadStream = () => {
  const data = ["first", "second", "third", "fourth"];
  return new Readable({
    encoding: "utf8",
    read() {
      if (data.length === 0) this.push(null);
      else this.push(data.shift());
    },
  });
};

const readable = createReadStream();

readable.on("data", (data) => {
  console.log("got data", data);
});

readable.on("end", () => {
  console.log("finished reading");
});
