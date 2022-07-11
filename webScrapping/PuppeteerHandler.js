const puppeteer = require("puppeteer");
const {LAUNCH_PUPPETEER_OPTS} = require("./Options");
const {PAGE_PUPPETEER_OPTS} = require("./Options");

// This class using for getting full html of page
class PuppeteerHandler{
    constructor() {
        this.browser = null;
    }

    // Browser initialization and start of "puppeteer"
    async initBrowser(){
        this.browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    }

    // Closing of browser and end of "puppeteer"
    closeBrowser(){
        this.browser.close();
    }

    // Function for getting full html of current page
    async getPageContent(url){
        if(!this.browser){
            await this.initBrowser();
        }

        const page = await this.browser.newPage();
        await page.goto(url, PAGE_PUPPETEER_OPTS);

        return await page.content();
    }
}

module.exports = {
    PuppeteerHandler,
};