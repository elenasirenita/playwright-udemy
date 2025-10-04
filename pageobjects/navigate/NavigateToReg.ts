import {Locator, Page} from "@playwright/test"

export class NavigateToReg {

    private readonly page:Page

    constructor(page:Page) {
        this.page = page

    }
    async registrationPage() {
        await this.page.goto('http://127.0.0.1:5500/register.html')
    }
    
}
