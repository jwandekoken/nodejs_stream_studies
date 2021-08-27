"use strict";

/*
  Using the Readable.from utility method which creates streams from iterable data structures, like arrays.

  Contrary to the Readable constructor, the Readable.from utility function sets objectMode to true by default.
*/

const { Readable } = require("stream");

const readable = Readable.from(["some", "data", "to", "read"]);

readable.on("data", (data) => {
  console.log("got data", data);
});

readable.on("end", () => {
  console.log("finished reading");
});
