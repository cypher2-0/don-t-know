const http = require('http');

const TARGET_PORT = 3000;
const PORT = 3001;

const server = http.createServer((req, res) => {
  // If requesting root, rewrite to /customer
  let targetPath = req.url;
  if (req.url === '/' || req.url === '') {
    targetPath = '/customer';
  }

  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: `localhost:${TARGET_PORT}`,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Customer App Gateway Error: Make sure Next.js is running on port 3000');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Customer Mobile App is live on http://localhost:${PORT}`);
});
