const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

// Configuration
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routes = require('./routes');

if (env === 'development') {
  console.log('Loaded routes: ');
}

for (const route in routes) {
  if (env === 'development') {
    console.log(chalk.blue(`  /${route.replace('js', '')}`));
  }

  app.use(`/${route}`, routes[route]);
}

app.use(errorHandlers.notFound);

if (env === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
