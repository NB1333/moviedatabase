const {Client} = require("pg");

class HelperMethods {
    static createRequest(data, name) {
        let request = `INSERT INTO ${name} (name) VALUES `;

        for (let i = 0; i < data.length; i++) {
            request += "(\'";
            request += data[i].trim();
            request += "\'),\n";
        }

        request = request.slice(0, request.length - 2);

        console.log(request);

        return request;
    }

    static connectToDB() {
        return new Client({
            host: 'localhost',
            user: 'postgres',
            port: 5432,
            password: '1234',
            database: 'movies'
        });
    }
}

module.exports = {
    HelperMethods
}