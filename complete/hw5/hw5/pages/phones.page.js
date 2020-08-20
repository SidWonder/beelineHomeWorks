import Page from "./page";
import CartPage from "./cart.page";

class PhonesPage extends Page {

    get contentContainer() { return $("div[class*='SmoothContentSwitcher_container']") };
    get showAllBrands() { return $("//div[contains(@class,'borderBottom') and .//span[text()='Производитель']]//span[text()='Показать все']") };
    get nokiaLabel() { return $("#checkbox__proizvoditel_proizvoditel-nokia") };
    get buyButtons() { return $$("[class*='ReactiveButton'][class*='BuyButtonLayout']") };
    get products() { return $$("[class*=ProductCard_component]") };


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

};

export default PhonesPage;