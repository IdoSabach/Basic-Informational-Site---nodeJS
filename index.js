const http = require("http");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const err404 = fs.readFileSync(path.join(__dirname, 'page', '404.html'), 'utf-8');

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "page", "index.html"), (err, data) => {
      if (err){
        res.writeHead(404,{ "Content-Type": "text/html" })
        res.end(err404)
        return;
      };
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
  else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "page", "about.html"), (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(err404);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(err404);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
