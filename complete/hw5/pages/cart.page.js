import Page from "./page";

class CartPage extends Page {

    get confirmOrder() { return $("//div[contains(@class,'shop-order-summary-liner')]//button[contains(text(),'Оформить заказ')]") };
    get orderProducts() { return $$("//h3/a") };
    get deleteButton() { return $("//span[contains(@data-ng-click,'deleteItem')]//*[name()='svg']") };
    get restoreButton() { return $("//span[contains(@data-ng-click,'restoreItem')]") };

    open() {
        super.open("/basket/#?step=orderList");
    };

    deleteFromCart() {
        return this.deleteButton.click();
    };

    restoreToCart() {
        return this.restoreButton.click();
    };

}

export default CartPage;