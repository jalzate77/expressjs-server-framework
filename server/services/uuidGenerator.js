const Service = require("./service");
const { v4: uuidv4 } = require("uuid");

let emailService = new Service("UUID Generator", handler, 1000);
// emailService.status = "Requested Stop"

function handler() {
  try {
    let value = uuidv4();
    emailService.log(value);
  } catch (error) {
    handleError(error);
  }
}

module.exports = emailService;
