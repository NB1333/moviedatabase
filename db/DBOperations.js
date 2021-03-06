const {HelperMethods} = require('../helpers/helpersMethods.js')

// This class using for working with movies database
class DatabaseOperations {
    #client;

    // Constructor, where database was imported in NodeJS
    constructor() {
        this.#client = HelperMethods.connectToDB();
    }

    // Inserting data to database that we web scrapped
    async writeToDB(movieData) {
            // Creating SQL requests for tables "actors" and "genres"
            let genres = HelperMethods.createRequest(movieData.genres, "genres");
            let actors = HelperMethods.createRequest(movieData.actors, "actors");

            /* Inserting data to table "movies" (movie_title, movie_poster, movie_country, movie_budget,
              movie_duration, movie_rate, movie_description) */
            await this.#client.query(`INSERT INTO movies (title, poster, relize, country, budget, duration, rate, description) 
                    VALUES ('${movieData.title}', '${movieData.poster}', '${movieData.relize}', '${movieData.country}', 
                    '${movieData.budget}', '${movieData.duration}', '${movieData.rate}', '${movieData.description}')`,
                (err, res) => {

                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${res.command} ${res.rowCount} row/-s successfully!`);
                    }
                })

            // Inserting data to table "actors" (actors_id, actors_name)
            await this.#client.query(actors, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`${res.command} ${res.rowCount} row/-s successfully!`);
                }
            });

            // Inserting data to table
            await this.#client.query(`INSERT INTO producers (name) VALUES ('${movieData.producer}')`, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`${res.command} ${res.rowCount} row/-s successfully!`);
                }

            })

            await this.#client.query(genres, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`${res.command} ${res.rowCount} row/-s successfully!`);
                }
                this.#client.end();
            })

            // console.log(movieData.isSeries, movieData.episodes);
        }

        // console.log(movieData.isSeries, movieData.episodes);
        // console.log(movieData.e404);

    get getClient(){
        return this.#client;
    }
}

module.exports = {
    DatabaseOperations
}