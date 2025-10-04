import {Locator, Page} from "@playwright/test"
export class LoginPage {
    // se recomiendo no hardcodear datos en el page object
    
    //defino tipado de las variables
    private readonly usernameTextbox : Locator
    private readonly passwordTextbox : Locator
    private readonly logButton : Locator
       
    //constructor   
    constructor (page: Page)  {
        
        this.usernameTextbox = page.locator('input#username')
        this.passwordTextbox = page.locator('input#password')
        //this.logButton = page.locator('//button[@type=\'submit\']')
        this.logButton = page.locator('//button[@type="submit"]')
    } 

    //methods
    private async fillUsername (username : string) {
        await this.usernameTextbox.fill(username)
    }

    private async fillPassword (passw : string) {
        await this.passwordTextbox.fill(passw)
    }

    
    private async clickOnLoginButton () {
        await this.logButton.click()
    }

    async doLogin(username: string, passw : string) {
        await this.fillUsername(username)
        await this.fillPassword(passw)
        await this.clickOnLoginButton()
    }
 
}