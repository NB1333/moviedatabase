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

    // Measure the execution time of specific function
    static async measureTime(func){
        let startTime = new Date();
        await func();
        let time = new Date() - startTime;
        let timeInSeconds = time / 1000;
        console.log("Execution time: %fs", timeInSeconds);

    }
}

module.exports = {
    HelperMethods
}