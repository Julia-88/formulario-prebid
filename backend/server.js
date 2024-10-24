const express = require('express');
const winston = require('winston');
const cors = require('cors');

const app = express();


// Configuración de winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});




app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});


app.get("/", async (req, res) => {
    return res.json({ message: "Hello, World from backend" });
  });


app.post("/aduid", async (req, res) => {
    console.log(req.body)
    return res.status(200);
  });

const start = async () => {
    try {
      app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();