const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registroSchema = new Schema({
    nombre: String,
    nif: String,
    matricula: String,
    importe: Number,
    motivo: String,
    fecha: String,
    cobrado: Boolean,
    cobradoFecha: String,
    trabajador: String
});

module.exports = mongoose.model('persona', registroSchema);
