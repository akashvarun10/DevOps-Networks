const express = require('express');
const client = require('prom-client'); // Metric Collection
const { doSomeHeavyTask } = require('./util');

const app = express();
const port = process.env.PORT || 8000;

/**
 * Collects default metrics for monitoring.
 * @function collectDefaultMetrics
 * @param {Object} client - The client object used for collecting metrics.
 * @returns {void}
 */
const collectDefaultMetrics = client.collectDefaultMetrics;

// This line collects default metrics using the 'client.register' object
collectDefaultMetrics({ register: client.register });

app.get('/', (req, res) => {
    return res.json({ message: 'Hello from Express Server' });
});

app.get('/slow', async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({ 
            status: 'success',
            message: `Task completed in ${timeTaken} ms`
        });
    } catch (err) {
        return res.status(500).json({ 
            status: 'error',
            message: 'Internal Server Error'
        });
    }
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.listen(port, () => 
    console.log(`Server is running on http://localhost:${port}`)
);