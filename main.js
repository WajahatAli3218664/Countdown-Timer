#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
import figlet from "figlet";
console.log(chalk.blue.italic(figlet.textSync("Count Down Timer")));
const time = await inquirer.prompt({
    name: "countDownTimer",
    type: "number",
    message: chalk.greenBright("Enter the amount in Seconds:"),
    validate: (userInp) => {
        if (isNaN(userInp)) {
            return chalk.redBright("In Valid Number!!!");
        }
        else if (userInp > 60) {
            return chalk.bgBlueBright("Time must be in Seconds.");
        }
        else {
            return true;
        }
    }
});
let input = time.countDownTimer;
function setTimeToStart(userVal) {
    const startTime = new Date().setSeconds(new Date().getSeconds() + userVal);
    const newTime = new Date(startTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(newTime, currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.yellowBright("Your Time's up.."));
            process.exit();
        }
        const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDifference % 60);
        console.log(chalk.magentaBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }), 1000);
}
setTimeToStart(input);
