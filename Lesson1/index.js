const colors = require("colors");

const min = Math.round(+process.argv[2]);
const max = Math.round(+process.argv[3]);

const minIsTrue = isNumber(+process.argv[2]) && +process.argv[2] > 2;
const maxIsTrue = isNumber(+process.argv[3]) && +process.argv[3] > 0 && +process.argv[3] > +process.argv[2];

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

console.log(min, max);
console.log(minIsTrue, maxIsTrue);

if (minIsTrue && maxIsTrue) {
    let x = 0;
    for (let i = min; i <= max; i++) {
        let flag = false;
        
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if ((i % j) === 0) flag = true;
            }
        if (flag === false) {
            if (x % 3 === 1) {
                console.log(colors.green(i));
            }
            else if (x % 3 === 2) {
                console.log(colors.yellow(i));
            }
            else if (x % 3 === 0) {
                console.log(colors.red(i));
            };
            x = x + 1; 
        }
    }
    if (x === 0) console.log(colors.red("В данном диапазоне отсутствуют простые числа"));
} else {
    console.error(colors.bgRed("Ошибка! Диапазон введен не корректно."));
}



