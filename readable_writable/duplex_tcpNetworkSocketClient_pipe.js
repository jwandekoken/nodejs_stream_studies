"use strict";

/*
  process.stdout is a Writable stream. Anything written to process.stdout will be printed out as process output. Note that there are no newlines, this is because we were using console.log before, which adds a newline whenever it is called.

  The pipe method exists on Readable streams (recall socket is a Duplex stream instance and that Duplex inherits from Readable), and is passed a Writable stream (or a stream with Writable capabilities). Internally, the pipe method sets up a data listener on the readable stream and automatically writes to the writable stream as data becomes available.

  Since pipe returns the stream passed to it, it is possible chain pipe calls together: streamA.pipe(streamB).pipe(streamC). This is a commonly observed practice, but it's also bad practice to create pipelines this way. If a stream in the middle fails or closes for any reason, the other streams in the pipeline will not automatically close. This can create severe memory leaks and other bugs. The correct way to pipe multiple streams is to use the stream.pipeline utility function.
*/

const net = require("net");

const socket = net.connect(3000);

socket.pipe(process.stdout);

socket.write("hello");

setTimeout(() => {
  socket.write("all done");

  setTimeout(() => {
    socket.end();
  }, 250);
}, 3250);
