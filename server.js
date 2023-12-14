const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    console.log(req.headers['content-type'])

    // Parse the body of the request as x-www-form-urlencoded if Content-Type
    // header is x-www-form-urlencoded
    if(req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(reqBody);


    // Parse the body of the request as JSON if Content-Type header is
    // application/json
    } else if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.body = decodeURIComponent(reqBody);
    }
    const resBody = JSON.stringify(req.body);

    // Return the `resBody` object as JSON in the body of the response
    res.setHeader("content-type", "application/json")
    res.statusCode = 200;
    res.end(JSON.stringify(resBody))
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
