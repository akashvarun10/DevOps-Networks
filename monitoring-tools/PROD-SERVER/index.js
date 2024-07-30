const express = require('express');
const responseTime = require('response-time'); // Response Time Middleware   
const client = require('prom-client'); // Metric Collection
const { doSomeHeavyTask } = require('./util');
const { createLogger, transports, error } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
        labels: { appName: "express-server" },
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

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

// Creating a Custom Metric
const reqResTime = new client.Histogram({
    name: 'http_express_req_res_time',
    help: 'Request and Response time in milliseconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCounter = new client.Counter({
    name: 'total_requests',
    help : 'Total number of requests made to the server',
});
    

app.use(responseTime((req, res, time) => {
    totalReqCounter.inc();
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status: res.statusCode
    }).observe(time);
}));

app.get('/', (req, res) => {
    logger.info("Request to / endpoint");
    return res.json({ message: 'Hello from Express Server' });
});

app.get('/slow', async (req, res) => {
    try {
        logger.info("Request to /slow endpoint");
        const timeTaken = await doSomeHeavyTask();
        return res.json({ 
            status: 'success',
            message: `Task completed in ${timeTaken} ms`
        });
    } catch (err) {
        logger.error(error.message);
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