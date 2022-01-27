const { urlencoded } = require("express");
const express = require("express");
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

process.env.BASE_PATH = __dirname;

const router = require("./router");
app.use("/api", router.getRoutes());

require("dotenv").config("./.env");
const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});