#!/c/Program\ Files/nodejs/node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const yargs = require('yargs');
const inquirer = require('inquirer');
const { string } = require('yargs');


const readFileForFind = (fullPath, findWord) => {
    const readStream = fs.createReadStream(
        fullPath,
        {
            flags: 'r',
            encoding: 'utf-8',
            highWaterMark: 30,
        });
            
    const rl = readline.createInterface({
        input: readStream,
    });    

    rl.on('line', (line) => {
        if (line.includes(findWord)) {
            console.log('Совпадение найдено: ', line);
        }
    });
};

const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();

 const dirParrent1 = './';
const list = (dirParrent = dirParrent1) => fs.readdirSync(dirParrent);
let flagFirstStart = true; 

let fullPath = executionDir;
const run = (dirParrent) => {
    inquirer.prompt([
        {
            name: 'dirStart',
            type: 'input', 
            message: 'Input start directory',
            default: './',
            when: () => (flagFirstStart)
        },
        {
            name: 'fileName',
            type: 'list', 
            message: 'Choose a file to read',
            choices: (answers) => {
                 if (flagFirstStart) return list(answers.dirStart);
                 else return list(dirParrent);
            },
        },
        {
            name: 'findWord',
            type: 'input', 
            message: 'Input find str',
            when: (answers) => {
                return isFile(path.join(fullPath, answers.fileName));
            }
        },
]) 
    .then((answers) => {
        fullPath = path.resolve(fullPath, answers.fileName);
        flagFirstStart = false;

        if (isFile(fullPath)) {
            readFileForFind(fullPath, answers.findWord)
        } else run(fullPath);
    });
}

run();



