const {PuppeteerHandler} = require("./webScrapping/PuppeteerHandler.js");
const {CheerioReader} = require("./webScrapping/CheerioReader.js");
const {DatabaseOperations} = require("./db/DBOperations");

async function main() {
    const puppeteerHandler = new PuppeteerHandler();
    const databaseOperations = new DatabaseOperations();

    const pageContent = await puppeteerHandler.getPageContent("https://ru.kinorium.com/63246/");
    const cheerioReader = new CheerioReader(pageContent);

    await cheerioReader.getDataFromPage(pageContent);

    databaseOperations.getClient.connect();
    await databaseOperations.writeToDB(cheerioReader.getMovieData);
}

async function start() {
    let start = new Date();
    await main();
    let time = new Date() - start;
    console.log(time / 1000);
}

start();
