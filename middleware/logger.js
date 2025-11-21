const logger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request details
  console.log('\n--- Request ---');
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Query:`, req.query);
  
  // Log request body if present
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Capture the original send function
  const originalSend = res.send;
  
  // Override the send function to log response
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    
    console.log('\n--- Response ---');
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response Time: ${responseTime}ms`);
    console.log('------------------------\n');
    
    // Call the original send function
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = logger;
