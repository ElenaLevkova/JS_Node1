const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = './Lesson3/access_short.log';
const findIP = ['89.123.1.41', '34.48.240.111'];

const readStream = fs.createReadStream(
    ACCESS_LOG,
    {
        flags: 'r',
        encoding: 'utf-8',
        // autoClose
        // start
        // end
        highWaterMark: 30,
    });

readStream.on('open', () => {
    console.log('File opened!');
});

findIP.forEach(IP => {
    fs.access('./Lesson3/' + IP +'_requests.log', function(error){
        if (!error) {
            fs.unlink('./Lesson3/' + IP +'_requests.log', (err) => {
                if (err) console.log(err);   
                else console.log(IP +'_requests.log was deleted');
            });
        }
    });
});

const rl = readline.createInterface({
    input: readStream,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    findIP.forEach(IP => {
        if ((line.indexOf(IP) >= 0)) {
           // console.log(line);
            fs.appendFile('./Lesson3/' + IP +'_requests.log', line + '\n', function(error){
                if(error) throw error; 
            });
        }
    })
});

readStream.on('end', () => {
    console.log('Finished!');
    findIP.forEach(IP => {
        console.log('Запись файла завершена' + IP + '_requests.log. Содержимое файла:');
        let data = fs.readFileSync('./Lesson3/' + IP + '_requests.log', "utf8");
        console.log(data);  // выводим считанные данные
    });
});

readStream.on('error', (err) => {
    console.log(err);
});


