"use strict";

/*
  Using the fs to create a writable stream
*/

const fs = require("fs");

const writable = fs.createWriteStream("./out");

writable.on("finish", () => {
  console.log("finished writing");
});

writable.write("A\n");
writable.write("B\n");
writable.write("C\n");
writable.end("nothing more to write");
