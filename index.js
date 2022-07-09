const {PuppeteerHandler} = require("./webScrapping/PuppeteerHandler.js");
const {CheerioReader} = require("./webScrapping/CheerioReader.js");
const {DatabaseOperations} = require("./db/DBOperations");

async function main(){
    const puppeteerHandler = new PuppeteerHandler();
    const pageContent = await puppeteerHandler.getPageContent("https://ru.kinorium.com/6324/");

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

main();
