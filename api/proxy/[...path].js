import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import { parse } from 'url';

// This is a workaround to use http-proxy-middleware with Vercel serverless functions
export default function handler(req, res) {
  // Parse the URL
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  
  // Extract the path from the URL (remove /api/proxy)
  const path = pathname.replace(/^\/api\/proxy/, '');
  
  // Create a custom server
  const server = createServer((req, res) => {
    const proxy = createProxyMiddleware({
      target: 'http://52.4.2.181:9999',
      changeOrigin: true,
      pathRewrite: {
        '^/api/proxy': '', // Remove /api/proxy prefix
      },
      onProxyRes: (proxyRes, req, res) => {
        // Add CORS headers
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      },
    });
    
    // Apply the proxy middleware
    proxy(req, res);
  });
  
  // Handle the request
  return new Promise((resolve, reject) => {
    // Modify the URL to include the extracted path
    req.url = path;
    
    server.emit('request', req, res);
    
    res.on('finish', resolve);
    res.on('error', reject);
  });
}

// Handle OPTIONS requests for CORS preflight
export const config = {
  api: {
    bodyParser: false,
  },
};