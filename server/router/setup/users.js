const express = require("express");
const filename = __filename.replace(process.env.BASE_PATH, "").replace(/\\/gi,"/");
const model = require("../.." + filename.replace("router", "models"));

function getRoutes() {
  let router = express.Router();

  createDefaultRoutes(router);
  createCustomRoutes(router);

  return router;
}

function createCustomRoutes(router) {
  
}

function createDefaultRoutes(router) {
  router.get("/", async (req, res) => {
    let result = await model.list();

    res.send(result);
  });

  router.post("/", async (req, res) => {
    let result = await model.save(req.body);

    res.send(result);
  });

  router.delete("/", async (req, res) => {
    let result = await model.remove(req.body);

    res.send(result);
  });
}

module.exports = { getRoutes };
