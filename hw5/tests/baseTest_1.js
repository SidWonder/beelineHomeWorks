require("chromedriver");
const assert = require("assert");
const {Builder, Key, By, until} = require("selenium-webdriver");

const queries = ["Теле2", "Тарифы Теле2", "Tele2"];

queries.forEach((query) => {
    describe("Checkout Google", () => {
        before(async function () {
            driver = await new Builder().forBrowser("chrome").build();
        });
    
        it("Search on Google: Title", async function () {
            await driver.get("https://google.com");
            await driver.findElement(By.xpath("//input[@name='q']")).click();
            await driver.findElement(By.xpath("//input[@name='q']")).sendKeys(query, Key.RETURN);
            await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
            let title = await driver.getTitle();
            assert.equal(title, `${query} - Поиск в Google`);
        });
    
        after(() => driver.quit());
    });
});