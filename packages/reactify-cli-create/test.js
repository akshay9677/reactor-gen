const ora = require("ora");

const spinner = ora("Loading unicorns").start();

setTimeout(() => {
  spinner.stop();
}, 1000);
