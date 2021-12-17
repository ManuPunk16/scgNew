const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.models");
db.role = require("./role.models");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;