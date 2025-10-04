import {Locator, Page} from "@playwright/test"

export class AddWorkData { 

    private readonly mondayD: Locator
    private readonly tuesdayD: Locator
    private readonly wednesdayD: Locator
    private readonly thursdayD: Locator
    private readonly fridayD: Locator
    private readonly imagePath: Locator
   
    constructor(page:Page) {

        this.mondayD = page.locator("input#monday")
        this.tuesdayD = page.locator("input#tuesday")
        this.wednesdayD = page.locator("input#wednesday")
        this.thursdayD = page.locator("input#thursday")
        this.fridayD = page.locator("input#friday")
        this.imagePath = page.locator("id=picture")

    }

    async addWorkData(lunes:string, martes:string, miercoles:string, jueves:string, viernes:string, imgpath:string) {
   
        if(lunes=='monday') {
           await this.mondayD.click()
        }    
        if (martes=='tuesday') {
           await this.tuesdayD.click() 
        }
        if (miercoles=='wednesday') {
            await this.wednesdayD.click()
        }
        if (jueves=='thursday'){    
            await this.thursdayD.click()
        }    
        if (viernes=='friday'){
            await this.fridayD.click() 
        }
        
        await this.imagePath.setInputFiles(imgpath)
        
    }
}