const http = require('http');
const PORT = 3000;

let counter = 0;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/ping') {
    const timestamp = new Date().toISOString();
    res.writeHead(200);
    res.end(JSON.stringify({ timestamp }));
  } else if (req.url === '/headers') {
    res.writeHead(200);
    res.end(JSON.stringify({ headers: req.headers }, null, 2));
  } else if (req.url === '/count') {
    counter++;
    res.writeHead(200);
    res.end(JSON.stringify({ count: counter }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
