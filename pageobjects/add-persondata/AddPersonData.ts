import {Locator, Page} from "@playwright/test"

export class AddPersonData { 
    private readonly personName : Locator
    private readonly personLastname : Locator
    private readonly personAge : Locator
    private readonly personCountry : Locator
    private readonly personSex : Locator
    private readonly personEmail : Locator

    constructor (page: Page)  {
        
        this.personName = page.locator('input#name')
        this.personLastname = page.locator('input#last-name')
        this.personAge = page.locator('input#age')
        this.personCountry = page.locator("id=country")
        this.personSex = page.locator("#sex-f")
        this.personEmail = page.locator("input#email")
    } 

    async addPersonalData(nombre:string, apellido:string, edad:string, pais:string,sexo:string,ecorreo:string) {

        await this.personName.fill(nombre)
        await this.personLastname.fill(apellido)
        await this.personAge.fill(edad)
        await this.personCountry.selectOption(pais)
        await this.personSex.click()
        await this.personEmail.fill(ecorreo)

    }

}