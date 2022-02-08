const server = require("http").createServer();

server.on("request", (request, response) => {
    const body = [];
    request.on("data", chunk => {
        body.push(chunk);
    });
    request
        .on("end", () => {
            let bodyString = body.concat().toString();
            console.log(bodyString);
            response.statusCode = 200;
            response.end(bodyString);
        })
        .on("error", () => {
            response.statusCode = 400;
            response.end();
        });
    response.on("error", err => {
        response.statusCode = 500;
        console.error(err);
    });
});
server.listen(process.env.PORT || 8008, () => {
    console.log("Server listening at 8008");
});

module.exports = server;
//curl -d "echo" -H "Content-Type: text" -X POST http://localhost:8008
