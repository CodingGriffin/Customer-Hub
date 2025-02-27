export default async function handler(req, res) {
  try {
    // Get the path from the URL
    const path = req.url.replace(/^\/api\/pdf-proxy/, '');
    const targetUrl = `http://52.4.2.181:9999${path}`;
    
    console.log('Proxying PDF request to:', targetUrl);
    
    // Fetch the PDF from the target server
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      console.error('Error from target server:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: 'Failed to fetch PDF from target server',
        status: response.status,
        statusText: response.statusText
      });
    }
    
    // Get the response as an array buffer (binary data)
    const pdfBuffer = await response.arrayBuffer();
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', Buffer.byteLength(pdfBuffer));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Send the PDF data
    res.status(200).send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};