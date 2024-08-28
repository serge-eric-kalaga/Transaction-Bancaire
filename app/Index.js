// ============ Modules
const express = require("express");
const { connection } = require("mongoose");
const { connect_db } = require("./configs/Database");
const client = require('prom-client');

// ============ Import Routes
const taskRouter = require("./routes/Task")
const userRouter = require("./routes/User")

// ============ Import Middlewares
const LoginRequired = require("./middlewares/Auth")
const loggerMiddleware = require("./middlewares/Logger")
const globalErrorHandler = require("./middlewares/ErrorHandler")
const Response = require("./middlewares/Response")
const {InitUser} = require("./configs/InitData");
// const { startMetricsServer } = require("./middlewares/Metrics");
// const pino = require('pino-http')()


require('dotenv').config()

const app = express();

// Création d'un registre pour Prometheus
const register = new client.Registry();
// Création de métriques personnalisées
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Durée des requêtes HTTP en ms',
  labelNames: ['method', 'route', 'code'],
});
// Enregistrement des métriques dans le registre
register.registerMetric(httpRequestDurationMicroseconds);

app.use(express.json());
app.use(globalErrorHandler)
app.use(Response)
app.use(loggerMiddleware)
// app.use(pino)

const PORT = process.env.PORT ;


app.get("/", (req, res, next) => {
    console.log(req.headers)
    res.json({
        succes: true
    });
})


// Middleware pour mesurer la durée des requêtes
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
      end({ route: req.route ? req.route.path : req.url, code: res.statusCode, method: req.method });
    });
    next();
  });

// Endpoint pour exposer les métriques
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });  



app.use("/tasks", LoginRequired, taskRouter)
app.use("/users", userRouter)


app.listen(PORT, "0.0.0.0", async () => {
    console.log(`App running on http://localhost:${PORT}`);
    // startMetricsServer(app)
    connect_db();
    await InitUser();
})

