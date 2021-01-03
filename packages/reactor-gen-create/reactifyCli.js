const { program } = require("commander");
const fs = require("fs-extra");
const chalk = require("chalk");
const { MultiSelect } = require("enquirer");
const execSync = require("child_process").execSync;
const exec = require("child_process").exec;
var Spinner = require("cli-spinner").Spinner;
var spinner = new Spinner(
  "%s  Installing selected plugins, this might take a while  "
);
spinner.setSpinnerString(15);

const options = [
  { name: "Redux", value: "redux" },
  { name: "React router dom", value: "react-router" },
];

const prompt = new MultiSelect({
  name: "plugins",
  message: `Select features required for your project (${chalk.blue(
    "space"
  )} to select and ${chalk.blue("arrow keys")} to navigate)`,
  choices: options,
});

function start() {
  program
    .version("0.0.1")
    .command("create <appName>")
    .action((appName) => {
      if (appName.toLowerCase() == appName && appName.toUpperCase() != appName)
        initializeProjectSetup(appName);
      else console.log("Enter a valid project name");
    });

  program.parse(process.argv);
}

async function initializeProjectSetup(appName) {
  await fs.copy(`${__dirname}/template/basic`, `./${appName}`, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  prompt
    .run()
    .then(async (answer) => {
      if (answer.length > 0) {
        answer.forEach((plugin) => {
          let currPlugin = options.find((option) => option.name === plugin);
          execSync(`cd ${appName} && npx hygen cli ${currPlugin.value}`);
        });

        spinner.start();
        exec(`cd ${appName} && npm i`, () => {
          spinner.stop();
          console.clear();
          console.log(
            `${chalk.green(
              "Successfully added plugin"
            )}, now run the following command to start your project\n`
          );
          console.log(`${chalk.cyan("1) cd")} ${appName} \n`);
          console.log(chalk.cyan("2) npm start \n"));
          execSync(`rm -R ${appName}/_templates`);
        });
      }
    })
    .catch((err) => console.error(err));
}

module.exports = { start };
