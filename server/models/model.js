const client = require("mongodb").MongoClient;
const { v4: uuidv4 } = require("uuid");
const server = "mongodb://127.0.0.1:27017";

async function list(database, collection, query) {
  let conn = await client.connect(server);

  if (conn) {
    let db = conn.db(database);

    let coll = db.collection(collection);

    if (!query) {
      query = {};
    }

    let result = await coll.find(query).toArray();

    return {
      type: "rows",
      value: result,
    };
  } else {
    return {
      type: "error",
      value: "cannot connect to server",
    };
  }
}

async function save(database, collection, model, query) {
  let conn = await client.connect(server);

  if (conn) {
    let db = conn.db(database);

    let coll = db.collection(collection);

    if (model.id == null || model.id == "") {
      model.id = uuidv4();
    }

    if (!query) {
      query = {
        id: model.id,
      };
    }

    delete model._id;

    let result = await coll.updateMany(
      query,
      { $set: model },
      { upsert: true }
    );

    return {
      type: "result",
      value: result,
    };
  } else {
    return {
      type: "error",
      value: "cannot connect to server",
    };
  }
}

async function remove(database, collection, query) {
  let conn = await client.connect(server);

  if (conn) {
    let db = conn.db(database);

    let coll = db.collection(collection);

    if (!query) {
      query = {
        _id: model._id,
        id: model.id,
      };
    }

    let result = await coll.deleteOne(query).toArray();

    return {
      type: "rows",
      value: result,
    };
  } else {
    return {
      type: "error",
      value: "cannot connect to server",
    };
  }
}

module.exports = {
  list,
  save,
  remove,
};
