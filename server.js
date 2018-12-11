const http = require('http');
const chalk = require('chalk');

const app = require('./src/app');

const port = process.env.PORT || 4000;

const server = http.Server(app);

server.listen(port, () => {
  console.log(chalk.green(`Server listing at port: ${port}`));
});
