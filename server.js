const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const Logger = require('logger-nodejs');
const log = new Logger();

const customLoggerMiddleware = (request, response, next) => {
  const { method, originalUrl, body } = request;
  log.info(`[REQ] ${method} ${originalUrl} ${JSON.stringify(body)}`);

  let errorMessage = null;
  let body1 = [];
  request.on("data", chunk => {
    body1.push(chunk);
  });
  request.on("end", () => {
    body1 = Buffer.concat(body1);
    body1 = body1.toString();
  });
  request.on("error", error => {
    errorMessage = error.message;
  });

  response.on("finish", () => {
    const { method } = request;
    const { statusCode } = response;
    log.info(
      `[RESP] ${method} ${originalUrl} ${statusCode} ${body1}`,
    );
  });

  next();
};

// Sử dụng custom logger middleware
app.use(customLoggerMiddleware);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
