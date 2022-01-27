let normalizedPath = require("path").join(__dirname, "");
let ignoreList = ["index.js", "model.js"];
let modules = {};

require("fs")
  .readdirSync(normalizedPath)
  .forEach((filename) => {
    let ignore = ignoreList.indexOf(filename) > -1;

    if (ignore) {
      return;
    }

    let filenameNoExt = filename.replace(".js", "");

    let file = require("./" + filename);

    modules[filenameNoExt] = file;
  });

module.exports = modules;
