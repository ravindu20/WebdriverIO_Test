const amazonPage = require('../pageobjects/amazon.page')
const placeOrderData = require('../dataFiles/placeOrderData')
const urls = require('../../urls')
describe('Online Order for a book from Amazon', () => {

    it('should able to place an order', async () => {

        //log in to amazon and escape from captcha
        browser.url(urls.amazonURL)
        await $('//div/div[3]/a[2]').click()

        await amazonPage.SearchItems(placeOrderData.searchCategory, placeOrderData.searhTerm)

        await amazonPage.SelectTheBookAndProceed(placeOrderData.noOfItems, placeOrderData.resetPrize)

    })
})