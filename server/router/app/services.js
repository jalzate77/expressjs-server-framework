const express = require("express");
const model = require("../../services");

function getRoutes() {
  let router = express.Router();

  createDefaultRoutes(router);
  createCustomRoutes(router);

  return router;
}

function createCustomRoutes(router) {}

function createDefaultRoutes(router) {
  router.get("/", async (req, res) => {
    let modelCopy = [];

    for (const key in model) {
      const service = model[key];
      modelCopy.push({
        name: service.name,
        status: service.status,
        logs: service.logs,
      });
    }

    res.send(modelCopy);
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
