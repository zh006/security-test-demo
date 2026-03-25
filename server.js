const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // ✅ 关键安全响应头配置
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains'); // HSTS
  res.setHeader('X-Frame-Options', 'DENY'); // 防点击劫持
  res.setHeader('X-Content-Type-Options', 'nosniff'); // 防 MIME 嗅探
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'"); // 防 XSS

  // 读取并返回 index.html
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('安全加固后的服务器运行在: http://localhost:3000');
});