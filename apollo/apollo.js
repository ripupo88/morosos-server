const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
//mongo
const {
    getUser,
    nuevoregistro,
    getRegistroByNif,
    updateRegistro,
    getRegistroByMatricula
} = require('../mongo/mongo');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const getUserByToken = token => {
    try {
        if (token) {
            return jwt.verify(token, 'solomoroso');
        }
        return null;
    } catch (err) {
        return null;
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || '';
        const token = tokenWithBearer.split(' ')[1];
        const user = getUserByToken(token);
        return {
            user,
            getUser,
            nuevoregistro,
            getRegistroByNif,
            updateRegistro,
            getRegistroByMatricula
        };
    }
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
