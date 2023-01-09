const mongoose = require("../db/db");
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Users", UserSchema);

