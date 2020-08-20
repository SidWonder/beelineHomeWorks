import Page from "./page";

class CartPage extends Page {

    get confirmOrder() { return $("//div[contains(@class,'shop-order-summary-data_btn-container)]//button[text()='Оформить заказ']") };
    get orderProducts() { return $$("//h3/a") };

    open() {
        super.open("/basket/#?step=orderList");
    };

}

export default CartPage;