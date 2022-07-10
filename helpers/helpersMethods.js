const {Client} = require("pg");

// Class that we created to add methods, that make code more readable and easier to understand
class HelperMethods {
    // Creating multiply SQL request
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

    // Database connection from Valentina (postgresQL)
    static connectToDB() {
        return new Client({
            host: 'localhost',
            user: 'postgres',
            port: 5432,
            password: '1234',
            database: 'movies'
        });
    }

    static async measureTime(main){
        let start = new Date();
        await main();
        let time = new Date() - start;
        console.log(time / 1000);
    }
}

module.exports = {
    HelperMethods
}