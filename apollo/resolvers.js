const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment.locale('es');

const resolvers = {
    Query: {
        busqueda: async (parent, { termino, objetivo }, ctx, info) => {
            if (objetivo === 'nif') {
                let respu = await ctx.getRegistroByNif(termino);
                console.log(respu);
                return respu;
            } else {
                let respu = await ctx.getRegistroByMatricula(termino);
                console.log(respu);
                return respu;
            }
        },
        login: async (parent, { username, password }, ctx, info) => {
            //const hashedPassword = await bcrypt.hash(password, 10);

            const user = await ctx.getUser(username);

            if (!user) {
                throw new Error('Invalid Login');
            }
            console.log(user.pass);
            const passwordMatch = await bcrypt.compare(password, user.pass);

            if (!passwordMatch) {
                throw new Error('Invalid Login');
            }

            const token = jwt.sign(
                {
                    username: user.usuario
                },
                'solomoroso',
                {
                    expiresIn: '30d' // token will expire in 30days
                }
            );
            let userRetorned = user.usuario;

            return {
                token,
                user: user.usuario
            };
        }
    },
    Mutation: {
        registro: (
            parent,
            {
                id,
                nombre,
                nif,
                matricula,
                importe,
                motivo,
                fecha,
                cobrado,
                trabajador
            },
            ctx
        ) => {
            let newFecha = moment.unix(fecha / 1000).format('D-MMM-YYYY');
            let obj_regis = {
                id,
                nombre,
                nif,
                matricula,
                importe,
                motivo,
                fecha: newFecha,
                cobrado,
                trabajador
            };
            id === 'algo'
                ? ctx.nuevoregistro(obj_regis)
                : ctx
                      .updateRegistro(obj_regis)
                      .then(e => console.log(e))
                      .catch(err => console.log(err));
            return nombre;
        }
    }
};
module.exports = resolvers;
