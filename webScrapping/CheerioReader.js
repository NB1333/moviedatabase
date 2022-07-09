const cheerio = require("cheerio");

class CheerioReader {
    #movieData = {};

    constructor(pageContent) {
        this.$ = cheerio.load(pageContent);
    }

    async getDataFromPage(pageContent) {
        let genres = [];
        let cast = [];

        this.#movieData['title'] = this.$('.film-page__title-elements-wrap h1').text();

        this.#movieData['poster'] = this.$('.jsCarouselImageContainer img')
            .attr('src');

        this.#movieData['relize'] = this.$('.film-page__title-elements-wrap a').text();

        this.#movieData['country'] = this.$('td.data')
            .children()
            .first()
            .text();

        this.#movieData['budget'] = this.$('span.box-budget-tooltip').text();

        this.#movieData['duration'] = this.$('tr:nth-child(2) td.data').text();

        this.#movieData['rate'] = this.$('a.ratingsBlockIMDb span.value').text();

        this.#movieData['description'] = this.$('section.film-page__text').text();

        this.$('a.film-page__main-cast-info').each((index, element) => {
            cast[index] = this.$(element).text();
        });
        this.#movieData['actors'] = cast;

        this.#movieData['producer'] = this.$('span.away-transparency')
            .children()
            .first()
            .text();

        this.$('ul.film-page__genres a').each((index, element) => {
            genres[index] = this.$(element).text();
        });
        this.#movieData['genres'] = genres;

    }

    get getMovieData(){
        return this.#movieData;
    }
}

module.exports = {
    CheerioReader
}