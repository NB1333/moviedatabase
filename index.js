const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '1234',
    database: 'movies'
});

//
class PuppeteerHandler{
    constructor() {
        this.browser = null;
    }

    async initBrowser(){
        this.browser = await puppeteer.launch();
    }

    closeBrowser(){
        this.browser.close();
    }

    async getPageContent(url){
        if(!this.browser){
            await this.initBrowser();
        }

        const page = await this.browser.newPage();
        await page.goto(url);

        return await page.content();
    }
}
async function writeToMovies(title, poster, relize, country, budget, duration, rate, description, cast, producer, genres) {

    await client.query(`INSERT INTO movies (title, poster, relize, country, budget, duration, rate, description) VALUES ('${title}', '${poster}', '${relize}', '${country}', '${budget}', '${duration}', '${rate}', '${description}')`, (err, res) => {
        console.log(err, res);
    })

    await client.query(cast,(err, res) => {
        console.log(err, res);
    });

    await client.query(`INSERT INTO producers (producer_name) VALUES ('${producer}')`, (err, res) => {
        console.log(err, res);
    })

    await client.query(genres, (err, res) => {
        console.log(err, res);
        client.end();
    })
}

async function finder(nameOfMovie) {
    await client.query(`SELECT `)
}

async function main(){
    const puppeteerHandler = new PuppeteerHandler();
    const pageContent = await puppeteerHandler.getPageContent("https://ru.kinorium.com/6324/");

    const $ = cheerio.load(pageContent);

    let cast = [];
    let genres = [];

    $('a.film-page__main-cast-info').each((index, element) => {
        cast[index] = $(element).text()
    })

    const realize_date = $('.film-page__title-elements-wrap a').text();
    const budget = $('span.box-budget-tooltip').text();
    const title = $('.film-page__title-elements-wrap h1').text();
    const poster = $('.jsCarouselImageContainer img').attr('src');
    const description = $('section.film-page__text').text();
    const country = $('td.data')
        .children()
        .first()
        .text();
    const duration = $('tr:nth-child(2) td.data').text();
    const rate = $('a.ratingsBlockIMDb span.value').text();

    $('ul.film-page__genres a').each((index, element) => {
        genres[index] = $(element).text()
    });
    const producer = $('span.away-transparency')
        .children()
        .first()
        .text();
    puppeteerHandler.closeBrowser();

    console.log("Фильм:", title);
    console.log("Дата:", realize_date);
    console.log("Постер:", poster);
    console.log("Страна:", country);
    console.log("Длительность:", duration);
    console.log("Бюджет:", budget);
    console.log("IMDB:", rate);
    console.log("Жанр:");
    genres.forEach(item => console.log(item));
    console.log("В главных ролях:");
    for(const actor of cast){
        console.log(actor);
    }
    console.log("Продюсер:", producer);
    console.log("Описание:", description);

    let stringCast = `INSERT INTO actors (actor_name) VALUES `;
    for(let i = 0; i < cast.length; i++){
        stringCast += "(\'";
        stringCast += cast[i].trim();
        stringCast += "\'),\n";
    }

    stringCast = stringCast.slice(0, -1);
    stringCast = stringCast.slice(0, -1);

    console.log(stringCast);

    let genre = `INSERT INTO genres (genre_name) VALUES `;
    for(let i = 0; i < genres.length; i++){
        genre += "(\'";
        genre += genres[i].trim();
        genre += "\'),\n";
    }

    genre = genre.slice(0, -1);
    genre = genre.slice(0, -1);

    console.log(genre);

    client.connect();
    await writeToMovies(title, poster, realize_date, country, budget, duration, rate, description, stringCast, producer, genre);
    //writeToActors(cast);
}

main();
