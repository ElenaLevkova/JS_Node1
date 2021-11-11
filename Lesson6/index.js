const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

let users = [];

const io = socket(server);
io.on('connection', client => {
    console.log('client.id', client.id);
    // console.log('new connection');
    // client.on('client-connection', () => {
        
    //     const payload = {
    //         message: client.id,
    //     };
    //     client.broadcast.emit('server-connection', payload);
    //     console.log('data', payload.message);
    // });
    client.on('client-nikname', data => {
        // console.log('data', data.name);
        if (data.name !== ''){
            users.push({id: client.id, name: data.name});
            
            const payload = {
                name: data.name,
                usersCount: users.length
            };
            console.log('users', users, users.length);
            client.emit('server-nikname-me', payload);
            client.broadcast.emit('server-nikname-all', payload);
        } else client.emit('server-nikname-err');
    });
    client.on('client-msg', data => {
        const payload = {
            message: data.message,
            name: users.find(el => el.id === client.id).name
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', () => {
        const payload = {
            name: users.find(el => el.id === client.id).name,
            usersCount: users.length - 1
        };
        client.broadcast.emit('server-disconnection', payload);
        // console.log('data', payload.message);
        console.log('dis_client.id---', client.id);
        users.splice(users.indexOf(users.find(el => el.id === client.id)), 1);
        client.disconnect();
    });
});


server.listen(5555);
