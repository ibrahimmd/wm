const { Sequelize } = require('sequelize');
const config = require('config');

var db_url=`${config.get('app.db.type')}://${config.get('app.db.username')}:${config.get('app.db.password')}@${config.get('app.db.host')}:${config.get('app.db.port')}/${config.get('app.db.database')}`;
const db = new Sequelize(db_url);

console.log(db_url);

// (async function(){
// try {
//   await db.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
//   finally{
//     process.exit(0);
//   }
// }());

module.exports = db;