const express = require("express");
let normalizedPath = require("path").join(__dirname, "");
let ignoreList = ["index.js"];

function getRoutes() {
  let router = express.Router();

  router.get("/", (req, res) => {
    res.send(`${req.method} ${req.baseUrl}`);
  });

  require("fs")
    .readdirSync(normalizedPath)
    .forEach((filename) => {
      let ignore = ignoreList.indexOf(filename) > -1;

      if (ignore) {
        return;
      }

      let filenameNoExt = filename.replace(".js", "");

      let file = require("./" + filename);

      router.use("/" + filenameNoExt, file.getRoutes());
    });

  return router;
}

module.exports = { getRoutes };
