const puppeteer = require("puppeteer");

// This class using for getting full html of page
class PuppeteerHandler{
    constructor() {
        this.browser = null;
    }

    // Browser initialization and start of "puppeteer"
    async initBrowser(){
        this.browser = await puppeteer.launch();
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
        await page.goto(url);

        return await page.content();
    }
}

module.exports = {
    PuppeteerHandler,
};