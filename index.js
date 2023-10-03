/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/* PATH__ALIASING____ */
require('module-alias/register');
const path = require('path');
const moduleAlias = require('module-alias');

const base = path.join(__dirname, '.');

moduleAlias.addAlias('app', path.join(__dirname, 'app'));
moduleAlias.addAlias('config.env', path.join(__dirname, 'config.env'));

moduleAlias.addAliases({
  '@models': path.join(base, 'models'),
  '@views': path.join(base, 'views'),
  '@controllers': path.join(base, 'controllers'),
  '@routes': path.join(base, 'routes'),
  '@utils': path.join(base, 'utils')
});

/* addAlias('@models', path.join(base, 'models'));
addAlias('@views', path.join(base, 'views'));
addAlias('@controllers', path.join(base, 'controllers'));
addAlias('@routes', path.join(base, 'routes'));
addAlias('@utils', path.join(base, 'utils'));
addAlias('@database', path.join(base, 'database')); */

process.on('uncaughtException', error => {
  console.log('🛑 Uncaught Exception Shutting Down!');
  console.log(error.name, error.message);

  process.exit(1);
});

dotenv.config({ path: 'config.env' });
const app = require('app');

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database connection successful!');
  });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running and listening on port ${PORT}!`);
});

process.on('unhandledRejection', error => {
  console.log('🛑 Unhandled Rejection Shutting Down!');
  console.log(error.name, error.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting Down!');

  server.close(() => {
    console.log('🛑 Process Terminated cause SIGTERM received!');
  });
});
