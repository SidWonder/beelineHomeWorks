const assert = require("assert");
const { addStep } = require("@wdio/allure-reporter").default;
import MainPage from "../pages/main.page";

let mainPage = new MainPage();
let phonesPage;
let cartPage;
let smartphonesList;
let smartphoneNames;
let smartphoneName;

describe("Добавление товаров в корзину", () => {
    
    before(() => {
        mainPage.open(); 
    });

    it("Переход в раздел \"Телефоны\" состоялся", () => {
        addStep("Нажать на ссылку \"Телефоны\"");
        phonesPage = mainPage.toPhones();

        addStep("Проверить, что URL изменился на верный");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/catalog/telefony/smartfony/");
    });

    it("Фильтрация по производителю – Nokia: отображаются только смартфоны Nokia", () => {
        addStep("Нажать на \"Показать все\" в блоке производителей");
        phonesPage.clickToShowAll();

        addStep("Выбрать Nokia в фильтре");
        phonesPage.selectNokiaFilter();

        addStep("Проверить, что все смартфоны из списка – Nokia");
        smartphonesList = phonesPage.products;
        smartphoneNames = phonesPage.getListOfPhonesNames();
        smartphoneNames.map(text => {
            assert.deepEqual(text.includes("Nokia"), true, `${text} не содержит слово "Nokia"`);
        });
    });

    it("Клик на кнопку \"Купить\" из середины списка приводит к переходу в корзину", () => {
        addStep("Нажать на кнопку \"Купить\" смартфона из середины списка");
        const middleIndex = Math.floor(smartphonesList.length / 2);
        const smartphone = smartphonesList[middleIndex];
        smartphoneName = smartphoneNames[middleIndex];
        cartPage = phonesPage.buySmartphone(smartphone);
        
        addStep("Проверить, что URL изменился на URL страницы корзины");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/basket/#?step=orderList");
    });

    it("В корзине находится только один товар, название совпадает с названием из каталога", () => {
        addStep("Проверить, что в списке только один товар, и именно тот товар, который добавляли");
        assert.deepEqual(cartPage.orderProducts.length, 1);
        assert.deepEqual(cartPage.orderProducts[0].getText(), smartphoneName);
    });
});