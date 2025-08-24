const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001;

// CORS設定
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true
}));

// Cal.com APIへのプロキシ
app.use('/api/cal', createProxyMiddleware({
  target: 'https://api.cal.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/cal': ''
  },
  onProxyReq: (proxyReq, req, res) => {
    // オリジナルのヘッダーを保持
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    // CORSヘッダーを追加
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:3000';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
}));

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying Cal.com API requests to https://api.cal.com`);
});
