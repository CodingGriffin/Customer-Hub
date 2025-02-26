import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy requests to the PHP server
app.use('/proxy', createProxyMiddleware({
  target: 'http://52.4.2.181:9999',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // remove /proxy path
  },
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});