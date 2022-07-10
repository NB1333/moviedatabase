const {PuppeteerHandler} = require("./webScrapping/PuppeteerHandler.js");
const {CheerioReader} = require("./webScrapping/CheerioReader.js");
const {DatabaseOperations} = require("./db/DBOperations");
const {HelperMethods} = require("./helpers/helpersMethods")

async function main() {
    // Create a class objects (PuppeteerHandler, databaseOperations)
    const puppeteerHandler = new PuppeteerHandler();
    const databaseOperations = new DatabaseOperations();

    // Function invoke (getPageContent) for getting html of current page
    const pageContent = await puppeteerHandler.getPageContent("https://ru.kinorium.com/63246/");

    // Create a class object (CheerioReader) and transferring html to cheerio using constructor
    const cheerioReader = new CheerioReader(pageContent);

    // Getting data about movie on this page
    await cheerioReader.getDataFromPage(pageContent);

    // Database connection and writing there received data about movie
    databaseOperations.getClient.connect();
    await databaseOperations.writeToDB(cheerioReader.getMovieData);
}

// Measure the execution time
HelperMethods.measureTime(main());

// async function timeOfWebScrapper() {
//     let start = new Date();
//     await main();
//     let time = new Date() - start;
//     console.log(time / 1000);
// }
//
// timeOfWebScrapper();

