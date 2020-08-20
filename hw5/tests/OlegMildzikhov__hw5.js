const chai = require('chai');
var expect = chai.expect;
const { addStep } = require('@wdio/allure-reporter').default
const { addEnvironment } = require('@wdio/allure-reporter').default

const assert = require("assert");
import MainPage from "../pages/main.page";

let mainPage = new MainPage();
let phonesPage;
let cartPage;
let smartphonesList;
let smartphoneNames;
let smartphoneName;
let smartphonePrices;
let priceTo;
let priceFrom;


describe('HW5_Task1_Oleg_Mildzikhov ФИЛЬТРАЦИЯ ПО ЦЕНЕ', function() {

    before(() => {
        addEnvironment('browserName: ', 'Chrome');
        addEnvironment('browserVersion: ', '80.0.3987.132');
        addEnvironment('OS: ', 'Win10 Pro x64');
        mainPage.open();
    });

    it("Переход в раздел \"Телефоны\" состоялся", () => {
        addStep("Нажать на ссылку \"Телефоны\"");
        phonesPage = mainPage.toPhones();

        addStep("Проверить, что URL изменился на верный");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/catalog/telefony/smartfony/");
    });

    it("Применен фильтр по ценам", () => {
        addStep("Получить плейсхолдер цены \"до\"");
        priceTo = phonesPage.getPriceUntilPH();
        priceFrom = priceTo - 2000;
        addStep("Ввести значение цены \"от\"");
        phonesPage.setPriceFilterFrom(priceFrom);
        phonesPage.waitForFilter();
        
    });

    it("Фильтр по ценам работает корректно", () => {
        addStep("Получить цены отображенных товаров");
        smartphonePrices = phonesPage.getPrices();

        smartphonePrices.map(text => {
            let phonePrice = text.replace(' ', '');
            phonePrice = phonePrice.replace(' ₽', '');
            let phonePriceInt = parseInt(phonePrice);
            addStep("Проверить, что цена в верном диапазоне");
            expect(phonePriceInt <= priceTo && phonePriceInt >= priceFrom).to.be.true;
        });
    });
});


describe('HW5_Task2_Oleg_Mildzikhov СОРТИРОВКА ПО ЦЕНЕ', function() {

    before(() => {
        addEnvironment('browserName: ', 'Chrome');
        addEnvironment('browserVersion: ', '80.0.3987.132');
        addEnvironment('OS: ', 'Win10 Pro x64');
        mainPage.open();
    });

    it("Переход в раздел \"Телефоны\" состоялся", () => {
        addStep("Нажать на ссылку \"Телефоны\"");
        phonesPage = mainPage.toPhones();

        addStep("Проверить, что URL изменился на верный");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/catalog/telefony/smartfony/");
    });

    it("Применена сортировка по ценам", () => {
        addStep("Нажать на \"Цены\"");
        phonesPage.clickToPriceSort()
        phonesPage.waitForFilter();
        
    });

    it("Сортировка по ценам работает корректно", () => {
        addStep("Получить цены отображенных товаров");
        smartphonePrices = phonesPage.getPrices();

        let prevPhonePrice = 0;
        smartphonePrices.map(text => {
            let phonePrice = text.replace(' ', '');
            phonePrice = phonePrice.replace(' ₽', '');
            let phonePriceInt = parseInt(phonePrice);
            addStep("Проверить, что цена в верном диапазоне");
            expect(phonePriceInt >= prevPhonePrice).to.be.true;
            prevPhonePrice = phonePriceInt;
        });
    });
});

describe('HW5_Task3_Oleg_Mildzikhov УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ И ЕГО ВОССТАНОВЛЕНИЕ', function() {

    before(() => {
        addEnvironment('browserName: ', 'Chrome');
        addEnvironment('browserVersion: ', '80.0.3987.132');
        addEnvironment('OS: ', 'Win10 Pro x64');
        mainPage.open();
    });

    it("Переход в раздел \"Телефоны\" состоялся", () => {
        addStep("Нажать на ссылку \"Телефоны\"");
        phonesPage = mainPage.toPhones();

        addStep("Проверить, что URL изменился на верный");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/catalog/telefony/smartfony/");
    });

    it("Клик на кнопку \"Купить\" из середины списка приводит к переходу в корзину", () => {
        smartphonesList = phonesPage.products;
        smartphoneNames = phonesPage.getListOfPhonesNames();
        addStep("Нажать на кнопку \"Купить\" смартфона из середины списка");
        const middleIndex = Math.floor(smartphonesList.length / 2);
        const smartphone = smartphonesList[middleIndex];
        smartphoneName = smartphoneNames[middleIndex];
        cartPage = phonesPage.buySmartphone(smartphone);
        console.log(smartphoneName);
        addStep("Проверить, что URL изменился на URL страницы корзины");
        assert.deepEqual(browser.getUrl(), "https://moskva.beeline.ru/shop/basket/#?step=orderList");
    });

    it("Нажатие на крестик удаляет из корзины", () => {
        addStep("Нажать на крестик в корзине");
        cartPage.deleteFromCart();
        addStep("Проверить, что появилось сообщение: \"Товар был удален из корзины\"");
        expect($("//td[contains(@class,'td__count')]//span").getText()).to.contains("Товар был удален из корзины");
    });

    it("Нажатие на \"Восстановить\" возвращает товар", () => {
        addStep("Нажать на \"Восстановить\" в корзине");
        cartPage.restoreToCart();
        addStep("Проверить, что пропало сообщение: \"Товар был удален из корзины\"");
        expect($("//td[contains(@class,'td__count')]//span").getText()).not.to.contains("Товар был удален из корзины");
    });
});