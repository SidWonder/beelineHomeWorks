describe('Test Beeline Shop', function(){
    beforeEach(function(){
        browser.url('https://moskva.beeline.ru/shop/');
        let title = browser.getTitle();
        expect(title).toEqual('Интернет-магазин Билайн Москва - продажа сотовых телефонов, смартфонов и аксессуаров');
    })
    
    it('should successfull open phone page', function(){
        $('//span[text()=\'телефоны\']').click();
        title=browser.getTitle();
        expect(title).toEqual('Смартфоны — купить смартфон, цены на телефоны в интернет-магазине Билайн Москва');
    });

    it('should successfull search samsung phone', function(){
        $('//span[text()=\'телефоны\']').click();
        title=browser.getTitle();
        expect(title).toEqual('Смартфоны — купить смартфон, цены на телефоны в интернет-магазине Билайн Москва');
        $('input[name=\'query\']').setValue('Samsung');
        browser.keys('Enter');
        let phoneNames = $$('div[class*="ProductCard_header"] a');
        expect(phoneNames[0].getText()).toContain('Samsung');
    });
});