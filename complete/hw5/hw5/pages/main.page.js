import Page from "./page";
import PhonesPage from "./phones.page";

class MainPage extends Page {

    get phonesLink() { return $("//a[@href='/shop/catalog/telefony/']") };

    //open() {
    //    super.open();
    //};

    toPhones() {
        this.phonesLink.click();
        let phonesPage = new PhonesPage();
        phonesPage.contentContainer.waitForDisplayed();
        return phonesPage;
    };

}

export default MainPage;