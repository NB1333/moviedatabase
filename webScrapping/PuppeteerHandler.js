const puppeteer = require("puppeteer");

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

module.exports = {
    PuppeteerHandler,
};