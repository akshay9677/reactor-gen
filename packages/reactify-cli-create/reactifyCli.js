const { program } = require("commander");
const fs = require("fs-extra");
const chalk = require("chalk");
const { MultiSelect } = require("enquirer");
const execSync = require("child_process").execSync;

const options = [
  { name: "Redux", value: "redux" },
  { name: "React router dom", value: "router" },
  { name: "Eslint", value: "eslint" },
];

const prompt = new MultiSelect({
  name: "plugins",
  message: "Select features required for your project",
  choices: options,
});

function start() {
  program
    .version("0.0.1")
    .arguments("<appName>")
    .action((appName) => {
      if (appName.toLowerCase() == appName && appName.toUpperCase() != appName)
        initializeProjectSetup(appName);
      else console.log("Enter a valid project name");
    });

  program.parse(process.argv);
}

function initializeProjectSetup(appName) {
  fs.copy(`${__dirname}/template/basic`, `./${appName}`, (err) => {
    if (err) console.log(err);
    else {
      console.log(`\n🖨️  Generated a basic ${chalk.cyan("react")} template \n`);
    }
  });

  prompt
    .run()
    .then(async (answer) => {
      console.log(chalk.cyan("Installing depedencies...."));

      execSync(`cd ${appName} && npm i`, (err) => {
        if (!err) {
        } else {
          console.log("here");
        }
      });
      console.log(chalk.cyan("Installed depedencies"));
      answer.forEach((plugin) => {
        let currPlugin = options.find((option) => option.name === plugin);
        console.log(currPlugin);
        execSync(`cd ${appName} && npx hygen cli ${currPlugin.value}`);
      });
    })
    .catch((err) => console.error(err));
}

module.exports = { start };
