"use strict";

/*
  using the fs to create a read stream
*/

const fs = require("fs");

const readable = fs.createReadStream(__filename);

readable.on("data", (data) => {
  console.log(" got data", data);
});

readable.on("end", () => {
  console.log(" finished reading");
});
