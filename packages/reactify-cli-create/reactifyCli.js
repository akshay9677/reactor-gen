const { program } = require("commander");
const fs = require("fs-extra");
const chalk = require("chalk");
const { MultiSelect } = require("enquirer");
const execSync = require("child_process").execSync;
const ora = require("ora");

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
      const spinner = ora("Installing Depedencies...").start();
      await execSync(`cd ${appName} && npm i`, (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      });

      spinner.stop();
      if (answer.length > 0) {
        const spinner2 = ora("Adding Plugins...").start();
        await answer.forEach((plugin) => {
          let currPlugin = options.find((option) => option.name === plugin);
          execSync(`cd ${appName} && npx hygen cli ${currPlugin.value}`);
        });

        await execSync(`cd ${appName} && npm i`);
        spinner2.stop();
      }
      console.clear();
      console.log(
        "Plugins added, now run the following command to start your project\n"
      );
      console.log(chalk.cyan(`1) cd ${appName} \n`));
      console.log(chalk.cyan("2) npm start \n"));
    })
    .catch((err) => console.error(err));
}

module.exports = { start };
