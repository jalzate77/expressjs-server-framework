const Service = require("./service");

let emailService = new Service("Email Service", handler, 1000);
// emailService.status = "Requested Stop"

function handler() {
  try {
    emailService.log("tick");
  } catch (error) {
    handleError(error);
  }
}

module.exports = emailService;
