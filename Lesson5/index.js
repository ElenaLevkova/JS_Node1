const http = require('http');
const fs = require('fs');
const path = require('path');

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const root = '..';
const list = (dirParrent) => fs.readdirSync(dirParrent);

const server = http.createServer((req, res) => {
    // console.log('list', list)
    let dirParrent = '';
    if (req.url !== '/favicon.ico') {
        dirParrent = root + req.url;
        console.log('dirParrent', dirParrent);
        if (dirParrent.substr(dirParrent.length-1, 1) == '/') {
            dirParrent = dirParrent.substr(0,dirParrent.length-1)
        }
        if (isFile(dirParrent)) {
                fs.readFile(dirParrent, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    console.log(data);
                    res.write(data);
                    res.end();
                }
                    });
        } else {
            let s = list(dirParrent).reduce((acc, el) => {
                return ('<li><a href="'+dirParrent+'/'+el+'">' + el + '</a></li>' + acc)
            }, '');
            s = '<ul>'+s+'</ul>'
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(s);
            res.end();
            console.log(`Url запроса: ${req.url}`);
        }
    } else {
        res.end();
    }
}).listen(3000);


