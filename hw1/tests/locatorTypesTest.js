require('chromedriver');
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');


describe("Дз 1, ищем нужные мобильники через xpath.", () => {
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://moskva.beeline.ru/shop');
        await driver.manage().window().maximize();
    });
    //Найти xpath телефона
    it('Перейти на вкладку телефон', async function() {
        let searchInput = await driver.findElement(By.xpath("//div[@class='ContentLiner_component_2sA3 ContentLiner_underlay_qpL0 styles_padh-s_3dpI']//a[2]"));
        await searchInput.click();
    });
    //Найти инпуты фильтрации: от и до (в блоке “Цена”),
    it('Инпуты "от" и "до"', async function() {
        let priceFrom = await driver.findElement(By.xpath("//input[@placeholder='1990']"));
        let priceTo = await driver.findElement(By.xpath("//input[@placeholder='131990']"));
    });
    //“Показать всё” в разделе фильтра “Производители”,
    it('Покажем все мобильники', async function() {
        await driver.wait(until.elementLocated(By.xpath("//div[./span[text()='Производитель']]/following-sibling::div/span")), 10000).click();
    });
    //Найти один из чекбоксов производителей, например, “Meizu”,
    it('Выберем Алкатель', async function() {
        let mobileSelected = await driver.findElement(By.xpath("//input[@id='checkbox__proizvoditel_proizvoditel-alcatel']"));
        mobileSelected.click();
    });

    after(() => driver.quit());
});