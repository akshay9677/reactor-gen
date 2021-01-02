const { program } = require("commander");
const execSync = require("child_process").execSync;

function init() {
  program
    .version("1.0.0")
    .arguments("<pluinName>")
    .action((pluginName) => {
      console.log(pluginName);
      switch (pluginName) {
        case "redux":
          execSync(`npx hygen cli redux`);
          break;
        default:
          console.log("Please enter a valid plugin name");
      }
    });

  program.parse(process.argv);
}
init();
module.exports = init;
