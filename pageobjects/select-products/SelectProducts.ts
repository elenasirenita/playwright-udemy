import {Locator, Page} from "@playwright/test"
import { expect } from "@playwright/test"

export class SelectProducts { 

    private readonly prod1Button: Locator
    private readonly prod2Button: Locator
    private readonly prod3Button: Locator
    private readonly viewcartButton: Locator
    private readonly cant1Cell: Locator
    private readonly cant2Cell: Locator
    private readonly cant3Cell: Locator
    private readonly checkoutButton:Locator

    private readonly page: Page

    constructor (page:Page) {
        this.page = page
        this.prod1Button = page.locator("//h5[contains(.,'Producto 1')]//ancestor::div[contains(@class,'card-body')]//button")
        this.prod2Button = page.locator("//h5[contains(.,'Producto 2')]//ancestor::div[contains(@class,'card-body')]//button")
        this.prod3Button = page.locator("//h5[contains(.,'Producto 3')]//ancestor::div[contains(@class,'card-body')]//button")
        this.cant1Cell=page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr/td[3]")
        this.cant2Cell=page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr/td[3]")
        this.cant3Cell=page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr/td[3]")
        this.viewcartButton = page.locator(("button#view-cart-btn"))
        this.checkoutButton = page.locator("button#checkout-btn")
    }

    //methods
    async addProductsToCart(cant1:string,cant2:string, cant3:string) {

        for (let i=1;i<=parseInt(cant1);i++) {
                await this.prod1Button.click()
        }

        for (let i=1;i<=parseInt(cant2);i++) {
                await this.prod2Button.click()
        }

        for (let i=1;i<=parseInt(cant3);i++) {
                await this.prod3Button.click()
        } 
    }

    async viewShoppingCart(){
        await this.viewcartButton.click()
    }

    async validateQuantitiesColumn(cant1:string,cant2:string,cant3:string){

        const product1Quantity = await this.cant1Cell.textContent()
        const product2Quantity = await this.cant2Cell.textContent()
        const product3Quantity = await this.cant3Cell.textContent()

        expect(product1Quantity).toEqual(cant1);
        expect(product2Quantity).toEqual(cant2);
        expect(product3Quantity).toEqual(cant3);
    
    }

    async doCheckout () {
        await this.checkoutButton.click()
    }

}