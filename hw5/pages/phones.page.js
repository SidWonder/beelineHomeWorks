import Page from "./page";
import CartPage from "./cart.page";
import { Browser } from "selenium-webdriver";

class PhonesPage extends Page {

    get contentContainer() { return $("div[class*='SmoothContentSwitcher_container']") };
    get showAllBrands() { return $("//div[contains(@class,'borderBottom') and .//span[text()='Производитель']]//span[text()='Показать все']") };
    get nokiaLabel() { return $("#checkbox__proizvoditel_proizvoditel-nokia") };
    get buyButtons() { return $$("[class*='ReactiveButton'][class*='BuyButtonLayout']") };
    get products() { return $$("[class*=ProductCard_component]") };
    get priceFilter() { return  $$("//div[contains(@class,'RangeFilter')]//input") };
    get priceSorter() { return $('//span[contains(text(), \'Цене\')]') };
    //get prices() { return $$("//div[contains(@class,'Heading')]//div[contains(@class,'InlineSet_item')]") };
    get prices() { return $$('//div[contains(@class,\'h3\')]//div[contains(text(), \'₽\')]') };
    //get prices() { return $$('//div[contains(text(), \'₽\')]')};

    open() {
        super.open("/catalog/telefony/smartfony");
    };

    clickToShowAll() {
        this.showAllBrands.click();
    };

    waitForFilterByBrand(brandName) {
        $(`//h1[text()='Смартфоны производитель ${brandName}']`).waitForDisplayed();
    };

    selectNokiaFilter() {
        this.nokiaLabel.click();
        this.waitForFilterByBrand("Nokia");
        this.buyButtons[0].waitForEnabled();
    };

    getListOfPhonesNames() {
        return this.products.map(element => {
            return element.$("div[class*='ProductCard'] > a").getText();
        });
    }; 

    buySmartphone(smartphoneElement) {
        smartphoneElement.$("[class*='ReactiveButton'][class*='BuyButtonLayout']").click();
        let cartPage = new CartPage();
        cartPage.confirmOrder.waitForEnabled();
        return cartPage;
    };

    getPriceUntilPH() {
        return this.priceFilter[1].getAttribute("placeholder");
    };

    setPriceFilterFrom(from) {
        this.priceFilter[0].setValue(from);
        this.buyButtons[0].waitForEnabled();
        return;
    };

    setPriceFilter(from, to) {
        this.priceFilter[0].setValue(from);
        this.priceFilter[1].setValue(to);
        this.buyButtons[0].waitForEnabled();
        return;
    };

    waitForFilter() {
        $('//div[contains(@class,\'SmoothContentSwitcher_container\') and contains(@class,\'SmoothContentSwitcher_static\')]').waitForEnabled(5000);
    };

    getPrices(){        
        return this.prices.map(element => {
            return element.getText();
        });
    };
    
    clickToPriceSort() {
        this.priceSorter.click();
    };

};

export default PhonesPage;