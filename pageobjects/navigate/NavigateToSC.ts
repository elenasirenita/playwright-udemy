import {Locator, Page} from "@playwright/test"

export class NavigateToSC {

    private readonly page:Page

    constructor(page:Page) {
        this.page = page

    }
    async openSelectProductsPage() {
        await this.page.goto('http://127.0.0.1:5500')
    }
    
}