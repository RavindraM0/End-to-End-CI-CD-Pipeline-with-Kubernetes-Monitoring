// ============================================
// IMPORTS
// ============================================

const express = require("express");
const cors = require("cors");
const client = require("prom-client");
require("dotenv").config();

const app = express();

// ============================================
// PROMETHEUS METRICS
// ============================================

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Counter
const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});

// Request duration histogram
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

// ============================================
// REQUEST LOGGER + METRICS
// ============================================

app.use((req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const duration = (Date.now() - start) / 1000;

        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });

        httpRequestDuration.observe(
            {
                method: req.method,
                route: req.route?.path || req.path,
                status: res.statusCode
            },
            duration
        );

        console.log(
            `${new Date().toISOString()} | ${req.method} ${req.path} | ${res.statusCode} | ${duration.toFixed(3)} sec`
        );

    });

    next();

});

// ============================================
// ROUTES
// ============================================

// Home
app.get("/", (req, res) => {

    res.status(200).json({
        application: "CI/CD Pipeline Project",
        version: process.env.APP_VERSION || "1.0.0",
        status: "Running",
        timestamp: new Date().toISOString()
    });

});

// Health Check
app.get("/health", (req, res) => {

    res.status(200).json({
        status: "healthy",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });

});

// Kubernetes Readiness Probe
app.get("/ready", (req, res) => {

    res.status(200).json({
        ready: true,
        timestamp: new Date().toISOString()
    });

});

// Sample Data API
app.get("/api/data", (req, res) => {

    res.status(200).json({
        message: "CI/CD Pipeline Working!",
        application: "CICD-Kubernetes-Project",
        version: process.env.APP_VERSION || "1.0.0",
        timestamp: new Date().toISOString()
    });

});

// Sample Users
app.get("/api/users", (req, res) => {

    res.status(200).json({
        users: [
            {
                id: 1,
                name: "John Doe",
                role: "Developer"
            },
            {
                id: 2,
                name: "Jane Smith",
                role: "DevOps Engineer"
            },
            {
                id: 3,
                name: "Mike Johnson",
                role: "System Administrator"
            }
        ],
        count: 3
    });

});

// Application Status
app.get("/api/status", (req, res) => {

    res.status(200).json({

        application: "CICD-Kubernetes-Project",

        version: process.env.APP_VERSION || "1.0.0",

        environment: process.env.NODE_ENV || "development",

        uptime: `${Math.floor(process.uptime())} seconds`,

        timestamp: new Date().toISOString(),

        memory: {

            rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,

            heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,

            heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,

            external: `${Math.round(process.memoryUsage().external / 1024 / 1024)} MB`

        }

    });

});

// Version
app.get("/api/version", (req, res) => {

    res.status(200).json({
        version: process.env.APP_VERSION || "1.0.0"
    });

});

// ============================================
// PROMETHEUS METRICS
// ============================================

app.get("/metrics", async (req, res, next) => {

    try {

        res.set("Content-Type", client.register.contentType);

        res.end(await client.register.metrics());

    } catch (err) {

        next(err);

    }

});

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({

        error: "Internal Server Error",

        message: err.message || "Something went wrong",

        timestamp: new Date().toISOString()

    });

});

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {

    res.status(404).json({

        error: "Not Found",

        message: `Route ${req.method} ${req.path} not found`,

        timestamp: new Date().toISOString()

    });

});

// ============================================
// EXPORT
// ============================================

module.exports = app;