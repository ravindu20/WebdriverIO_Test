const assert = require("assert")

class HomePage {

    //Get elements
    get searchTextBox() {
        return $('#twotabsearchtextbox');
    }

    get categoryDropDown() {
        return $('#searchDropdownBox');
    }

    get searchButton() {
        return $('#nav-search-submit-button');
    }

    get reviewElement() {
        return $('section[aria-label= "4 Stars & Up"]');
    }

    get languageElement() {
        return $('//li[@aria-label= "English"]/span/a/div');
    }

    get bookElement() {
        return $('//div[@cel_widget_id= "MAIN-SEARCH_RESULTS-2"]//div/h2/a/span');
    }

    get getAddToCartButton() {
        return $('#add-to-cart-button');
    }

    get productTitleElement() {
        return $('#productTitle');
    }

    get productQtyDropdown() {
        return $('#quantity');
    }

    get productPriceValue() {
        return $('//div[@id="corePrice_feature_div"]//span/span[2]');
    }

    get goToCartButton() {
        return $('#sw-gtc');
    }

    get shoppingCartBookTitle() {
        return $('//li[1]/span/a/span[1]/span/span[2]');
    }

    get shoppingCartTotalAmount() {
        return $('//span[@id="sc-subtotal-amount-activecart"]/span');
    }

    get shoppingCartQty() {
        return $('input[name = "quantityBox"]');
    }

    get deleteButton() {
        return $('input[value = "Delete"]');
    }

    //Methods

    /*
    This method is used to search with given category and keywords
    searchCategory : category need to select
    searhTerm : search term
    */
    async SearchItems(searchCategory, searhTerm) {

        await expect(this.searchTextBox).toBeExisting()

         //select search Category
        await this.categoryDropDown.selectByVisibleText(searchCategory)

         //type search term
        await this.searchTextBox.setValue(searhTerm);

         //click search button
        await this.searchButton.click()
        await browser.pause(2000)

        //click review element
        await this.reviewElement.scrollIntoView()
        await this.reviewElement.click()
        await browser.pause(2000)

        //select language
        await this.languageElement.scrollIntoView()
        await this.languageElement.click()
       
        
    }

     /*
    This method is used to select the book and procced the payment
    noOfItems: no of items on one product
    resetPrize: prize updated value once delete
    */
    async SelectTheBookAndProceed(noOfItems, resetPrize) {

        await this.bookElement.scrollIntoView()
        await browser.pause(5000)
        const nameOfTheBook = await this.bookElement.getText()
        console.log("Name of the Book: "+nameOfTheBook)

        await this.bookElement.click()

        this.getAddToCartButton.waitForDisplayed({ timeout: 5000 })
        await browser.pause(2000)
        await this.productTitleElement.scrollIntoView()
        const productTitleTxt = await this.productTitleElement.getText()
        await browser.pause(5000)
        console.log("Name of the Title: "+productTitleTxt)
        await this.productPriceValue.scrollIntoView()
        await browser.pause(3000)
        let productPriceText = await this.productPriceValue.getText()
        console.log("Price of the Product : "+productPriceText)

        //get the prize of the book and multiple it by no of items to get the total
        let priceVal = productPriceText.split("$")
        let totalPrice = (priceVal[1]*noOfItems).toFixed(2)
        let amntPrice = '$'+totalPrice
        console.log("Total Price "+amntPrice)
        
        await this.productQtyDropdown.scrollIntoView()
        await browser.pause(2000)
        await this.productQtyDropdown.selectByVisibleText(noOfItems)
        await browser.pause(2000)
       
        //Validate the title of the book
        assert.equal(nameOfTheBook, productTitleTxt)
        await expect(this.productTitleElement).toHaveText(nameOfTheBook)

        await this.getAddToCartButton.scrollIntoView()
        await this.getAddToCartButton.click()

        this.goToCartButton.waitForDisplayed({ timeout: 5000 })
        this.goToCartButton.click()

        await browser.pause(2000)
        //Validate the title of the book
        await expect(this.shoppingCartBookTitle).toHaveText(nameOfTheBook)

        //Validate the total price
        await expect(this.shoppingCartTotalAmount).toHaveText(amntPrice)

        //Validate the number of items
        await expect(this.shoppingCartQty).toHaveAttributeContaining('value',noOfItems)

        this.deleteButton.click()

         //Validate price after reset
        await expect(this.shoppingCartTotalAmount).toHaveText(resetPrize)

    }
}

module.exports = new HomePage();