require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Test server root' });
});

// Test routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API test endpoint' });
});

app.post('/api/test-post', (req, res) => {
    res.json({ message: 'POST endpoint working', body: req.body });
});

// Server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
}); 