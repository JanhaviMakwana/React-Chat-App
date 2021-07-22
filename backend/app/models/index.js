const dbConfig = require('../config/database.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.dbUrl;
db.user = require('./user')(mongoose);
db.chat = require('./chat')(mongoose);

module.exports = db;