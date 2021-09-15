import './env.js';
import chalk from 'chalk';

import app from './src/app.js';

console.log(chalk.red('YO LES GEEEEEENS'));
console.log(chalk.yellow('YO LES GEEEEEENS'));
console.log(chalk.green('YO LES GEEEEEENS'));
console.log(chalk.blue('YO LES GEEEEEENS'));
console.log(chalk.magenta('YO LES GEEEEEENS'));
console.log(chalk.inverse('YO LES GEEEEEENS'));
console.log(chalk.bgRed('YO LES GEEEEEENS'));
console.log(chalk.bgYellow('YO LES GEEEEEENS'));
console.log(chalk.bgGreen('YO LES GEEEEEENS'));
console.log(chalk.bgBlue('YO LES GEEEEEENS'));
console.log(chalk.bgMagenta('YO LES GEEEEEENS'));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(chalk.bgRed(`Server listening on port: ${PORT}`));
});