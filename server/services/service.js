module.exports = class Service {
  name = "";
  status = "";
  logs = [];
  intervalTime = 1000;

  serviceProcess = () => {
    return "This service has nothing to do.";
  };

  start() {
    this.status = "Running";

    this.log("Service has been started");

    this.interval = setInterval(() => {
      try {
        if (this.status == "Requested Stop") {
          this.handleStop(this.interval);
        } else if (this.status == "Running") {
          this.serviceProcess();
        }
      } catch (error) {
        this.handleError(error);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  log(message) {
    this.logs.push({
      date: new Date(Date.now()),
      log: message,
    });
  }

  handleStop() {
    clearInterval(this.interval);
    this.status = "Stopped";
    this.logs.push({
      date: new Date(Date.now()),
      log: "Service has been stopped by user.",
    });
  }

  handleError(error) {
    this.status = "Error";
    this.logs.push({
      date: new Date(Date.now()),
      log: error,
    });
    clearInterval(this.interval);
  }

  constructor(name, serviceProcess, intervalTime) {
    this.name = name;
    this.serviceProcess = serviceProcess;
    this.intervalTime = intervalTime;
  }
};
