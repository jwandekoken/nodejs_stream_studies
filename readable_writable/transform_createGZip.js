"use strict";

/*
  The Transform constructor inherits from the Duplex constructor. Transform streams are duplex streams with an additional constraint applied to enforce a causal relationship between the read and write interfaces. A good example is compression
*/

const { createGzip } = require("zlib");

const transform = createGzip();

transform.on("data", (data) => {
  console.log("got gzip data", data.toString("base64"));
});

transform.write("first");

setTimeout(() => {
  transform.end("second");
}, 500);
