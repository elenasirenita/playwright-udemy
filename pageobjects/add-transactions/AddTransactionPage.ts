import {Locator, Page} from "@playwright/test"

export class AddTransactionPage { 

    private readonly addTransactionButton : Locator
    private readonly transactionDate : Locator
    private readonly transactionAmount : Locator
    private readonly transactionDescrip : Locator
    private readonly saveTransactionButton : Locator
    private readonly page: Page


    constructor (page : Page) {
        this.page = page
        this.addTransactionButton = page.locator('//button[contains(text(), \'Añadir transacción\')]')
        this.transactionDate = page.locator('id=date')
        this.transactionAmount = page.locator('id=amount')
        this.transactionDescrip = page.locator('id=description')
        this.saveTransactionButton = page.locator("//button[@type='submit']")
    }
     //methods
    async addTransaction(fecha:string, monto:string, descr:string) {

        await this.addTransactionButton.click()
        await this.transactionDate.fill(fecha)
        await this.transactionAmount.fill(monto)
        await this.transactionDescrip.fill(descr)
        await this.saveTransactionButton.click()
    }

    async getActualAmount(row:string) { 
        this.actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await this.actualAmountRow.textContent()
    }

    async getActualDate(row:string) { 
        this.actualDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await this.actualDateRow.textContent()
    }

    async getActualDescription(row:string) { 
        this.actualDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await this.actualDescriptionRow.textContent()
    }

}