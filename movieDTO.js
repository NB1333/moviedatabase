const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '1234',
    database: 'movies'
});

export function write(title){
    client.connect();
    client.query(`INSERT INTO movies (title) VALUES (${title})`, (err, res) => {
        console.log(err, res);
        client.end();
    })

}

