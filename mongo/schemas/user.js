const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    usuario: String,
    pass: String
});

module.exports = mongoose.model('usuario', userSchema);
