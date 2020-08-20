const assert = require("assert");
const { addStep } = require("@wdio/allure-reporter").default;

let smartphonesList;
let smartphoneName;

describe("Добавление товаров в корзину", () => {

    before(() => {
        browser.maximizeWindow();
        browser.url("https://moskva.beeline.ru/shop/");
    });

    it("Переход в раздел \"Телефоны\" состоялся", () => {
        addStep("Нажать на ссылку \"Телефоны\"");
        $("//a[@href='/shop/catalog/telefony/']").click();
        $("div[class*='SmoothContentSwitcher_container']").waitForDisplayed();

        addStep("Проверить, что URL изменился на верный");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/catalog/telefony/smartfony/");
    });

    it("Фильтрация по производителю – Nokia: отображаются только смартфоны Nokia", () => {
        addStep("Нажать на \"Показать все\" в блоке производителей");
        $("//div[contains(@class,'borderBottom') and .//span[text()='Производитель']]//span[text()='Показать все']").click();

        addStep("Выбрать Nokia в фильтре");
        $("#checkbox__proizvoditel_proizvoditel-nokia").click();
        $("//h1[text()='Смартфоны производитель Nokia']").waitForDisplayed();
        $("[class*='ReactiveButton'][class*='BuyButtonLayout']").waitForEnabled();

        addStep("Проверить, что все смартфоны из списка – Nokia");
        smartphonesList = $$("[class*=ProductCard_component]");
        smartphonesList.map(element => {
            let text = element.$("div[class*='ProductCard'] > a").getText();
            assert.deepEqual(text.includes("Nokia"), true, `${text} не содержит слово "Nokia"`);
        });
    });

    it("Клик на кнопку \"Купить\" из середины списка приводит к переходу в корзину", () => {
        addStep("Нажать на кнопку \"Купить\" смартфона из середины списка");
        const smartphone = smartphonesList[Math.floor(smartphonesList.length / 2)];
        smartphoneName = smartphone.$("div[class*='ProductCard'] > a").getText();
        smartphone.$("[class*='ReactiveButton'][class*='BuyButtonLayout']").click();
        $("//div[contains(@class,'shop-order-summary-liner')]//button[text()='Оформить заказ']").waitForEnabled();

        addStep("Проверить, что URL изменился на URL страницы корзины");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/basket/#?step=orderList");
    });

    it("В корзине находится только один товар, название совпадает с названием из каталога", () => {
        addStep("Проверить, что в списке только один товар, и именно тот товар, который добавляли");
        const orderList = $$("//h3/a");
        assert.deepEqual(orderList.length, 1);
        assert.deepEqual(orderList[0].getText(), smartphoneName);
    });
});