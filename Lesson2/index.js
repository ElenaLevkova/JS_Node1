const colors = require("colors");

console.clear();

let enddate = process.argv; //'2021-10-25 20:30:20' //Пример ввода даты - времени таймера;
enddate.splice(0,2);
enddate = enddate.filter(time => {
    if (isNaN(Date.parse(time))) {
        console.log('Timer ERROR - ', time.red, ' - incorrect data');
        return false;
    } else {
        return true;
    } 
});

const callback_gen = (enddate) => {
    return function getTimeRemaining() {
        if (Date.parse(enddate) <= Date.parse(new Date())) {
            console.log('Timer before ', enddate, 'Timer end');
            emitterObject.removeListener('timer', getTimeRemaining);
        }
        if (Date.parse(enddate) > Date.parse(new Date())) {
            const t = Date.parse(enddate) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
    
            console.log('Timer before ', enddate.green, 'days:', days,'hours:', hours, 'minutes:', minutes,'seconds:', seconds )
        }
    }
}

const EventEmitter = require('events');

const emitterObject = new EventEmitter();


const run = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    emitterObject.emit('timer');
    //  console.log('!!!!',emitterObject._eventsCount)
    if (emitterObject._eventsCount === 0) {
        return ;
    }
    await run();
};
// emitterObject.emit('error', new Error('Что-то пошло не так!'));

enddate.map(time => emitterObject.on('timer', callback_gen(time)));

run();
