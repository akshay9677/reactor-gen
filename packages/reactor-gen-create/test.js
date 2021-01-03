var Spinner = require("cli-spinner").Spinner;

var spinner = new Spinner("processing.. %s  ");
spinner.setSpinnerString(15);
spinner.start();
setTimeout(() => {
  spinner.stop();
}, 2000);
