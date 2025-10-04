import {Locator, Page} from "@playwright/test"
import { expect } from "@playwright/test"
import { faker, Faker } from "@faker-js/faker"


export class Checkout { 
    
    private readonly nombreTextbox : Locator
    private readonly emailTextBox : Locator
    private readonly direccionTextbox : Locator
    private readonly pagarButton : Locator
    private readonly infodepagoHeader : Locator
    private readonly numTarjetaTextbox : Locator
    private readonly fechaexpTextbox : Locator
    private readonly cvvTarjetaTextbox : Locator
    private readonly page: Page
    private readonly resumencompraHeader : Locator
    private readonly informpersonalHeader : Locator
    private readonly compraexitosaHeader : Locator
    private readonly totalCompra : Locator

    constructor (page: Page) {
        this.page = page
        this.pagarButton = page.locator("//button[contains(.,'Pagar')]")
        this.nombreTextbox = page.locator("input#name")
        this.emailTextBox = page.locator("input#email")
        this.direccionTextbox = page.locator("input#address")
        this.infodepagoHeader = page.locator("//a[contains(.,'de pago')]")
        this.numTarjetaTextbox = page.locator("input#card-number")
        this.fechaexpTextbox = page.getByRole('textbox', { name: 'Fecha expiración:' })
        this.cvvTarjetaTextbox = page.getByRole('textbox', { name: 'CVV:' })
        this.resumencompraHeader = page.getByRole('heading', { name: 'Resumen de tu compra'})
        this.informpersonalHeader = page.getByRole('heading', { name: 'Información personal'})
        this.compraexitosaHeader = page.getByRole('heading', { name: '¡Tu compra fue exitosa!'})
        this.totalCompra = page.locator("//td[2]/strong")  
    }

    async fillPersonalInfo() {
        await this.nombreTextbox.fill(faker.person.fullName())
        await this.emailTextBox.fill(faker.internet.email())
        await this.direccionTextbox.fill(faker.location.streetAddress())
    }

    async fillPaymentInfo() {
        await this.infodepagoHeader.click()
        await this.page.waitForLoadState('networkidle');
        await this.numTarjetaTextbox.fill(faker.finance.creditCardNumber())
        await this.fechaexpTextbox.fill('11/30')
        await this.cvvTarjetaTextbox.fill(faker.finance.creditCardCVV())
    }

    async doPay () {
        await this.pagarButton.click()
    }

    async validateSuccessfulPurchase() {    
       await  expect(this.resumencompraHeader).toBeVisible()
       await  expect(this.informpersonalHeader).toBeVisible()
       await  expect(this.compraexitosaHeader).toBeVisible()
       await  expect(this.compraexitosaHeader).toHaveCSS("color","rgb(40, 167, 69)")
       await  expect(this.totalCompra).toBeVisible()     
       await  expect(this.totalCompra).toContainText('$110')
       
    }
 }