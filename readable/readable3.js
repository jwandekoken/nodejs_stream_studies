"use strict";

/*
  instantiating a read stream from Readable class, passing objectMode true.
  
  This time the string is being sent from the readable stream without converting to a buffer first
*/

const { Readable } = require("stream");

const createReadStream = () => {
  const data = ["some", "data", "to", "read"];
  return new Readable({
    objectMode: true,
    read() {
      if (data.length === 0) this.push(null);
      else this.push(data.pop());
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
