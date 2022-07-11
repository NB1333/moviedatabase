const {PuppeteerHandler} = require("./webScrapping/PuppeteerHandler");
const {CheerioReader} = require("./webScrapping/CheerioReader");
const {DatabaseOperations} = require("./db/DBOperations");
const {HelperMethods} = require("./helpers/helpersMethods");



async function main() {
    // Create a class objects (PuppeteerHandler, databaseOperations)
    const puppeteerHandler = new PuppeteerHandler();
    const databaseOperations = new DatabaseOperations();

    // Function invoke (getPageContent) for getting html of current page
    const pageContent = await puppeteerHandler.getPageContent("https://ru.kinorium.com/1545339/");

    // Create a class object (CheerioReader) and transferring html to cheerio using constructor
    const cheerioReader = new CheerioReader(pageContent);

    // Getting data about movie on this page
    await cheerioReader.getDataFromPage();

    console.log(cheerioReader.getMovieData);

    // Database connection and writing there received data about movie
    // databaseOperations.getClient.connect();
    // await databaseOperations.writeToDB(cheerioReader.getMovieData);

    // let data = cheerioReader.getMovieData;
}

// Measure the execution time of web scrapper
HelperMethods.measureTime(main);



