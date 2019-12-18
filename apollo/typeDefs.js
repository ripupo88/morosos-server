const { gql } = require('apollo-server');

const typeDefs = gql`
    # This "Book" type defines the queryable fields for every book in our data source.
    type login {
        token: String
        user: String
    }
    type nombre {
        nombre: String
    }

    type registro {
        id: String
        nombre: String
        nif: String
        matricula: String
        importe: Int
        motivo: String
        fecha: String
        cobrado: Boolean
        trabajador: String
    }

    type Query {
        login(username: String, password: String): login
        busqueda(termino: String, objetivo: String): [registro]
    }

    type Mutation {
        registro(
            id: String
            nombre: String
            nif: String
            matricula: String
            importe: Int
            motivo: String
            fecha: String
            cobrado: Boolean
            trabajador: String
        ): nombre
    }
`;

module.exports = typeDefs;
