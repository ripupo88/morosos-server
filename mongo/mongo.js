var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/morosos', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

const Registro = require('./schemas/registro');
const Usuario = require('./schemas/user');

let iniciar_DB = () => {
    Usuario.find({}, (err, res) => {
        if (err) console.log(err);
        if (res[0] == undefined) {
            nuevoUsuario({
                usuario: 'admin',
                pass: '1234'
            });
        }
    });
};

iniciar_DB();

let nuevoUsuario = objeto_usuario => {
    return new Promise((resolve, reject) => {
        let usuario = new Usuario(objeto_usuario);

        usuario.save((err, res) => {
            if (err) {
                console.log(err);
                reject('Error con la base de datos, posibles datos duplicados');
            }
            resolve(res);
        });
    });
};

let getUser = user => {
    return new Promise((resolve, reject) => {
        Usuario.find({ usuario: user }, (err, res) => {
            if (err) reject(err);
            resolve(res[0]);
        });
    });
};

let nuevoregistro = objeto_registro => {
    return new Promise((resolve, reject) => {
        console.log(objeto_registro);
        let registro = new Registro(objeto_registro);

        registro.save((err, res) => {
            if (err) {
                console.log(err);
                reject('Error con la base de datos, posibles datos duplicados');
            }
            resolve(res);
        });
    });
};

let updateRegistro = objeto_registro => {
    return new Promise((resolve, reject) => {
        Registro.findByIdAndUpdate(
            objeto_registro.id,
            {
                cobrado: objeto_registro.cobrado
            },
            (err, res) => {
                if (err) reject(err);
                resolve({
                    res
                });
            }
        );
    });
};

let getRegistroByNif = nif => {
    return new Promise((resolve, reject) => {
        Registro.find({ nif }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

let getRegistroByMatricula = matricula => {
    return new Promise((resolve, reject) => {
        Registro.find({ matricula }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

module.exports = {
    getUser,
    nuevoregistro,
    getRegistroByNif,
    updateRegistro,
    getRegistroByMatricula
};
