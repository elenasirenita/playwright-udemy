import {test,expect} from '@playwright/test'
import {NavigateToReg} from '../../pageobjects/navigate/NavigateToReg';
import {AddPersonData} from '../../pageobjects/add-persondata/AddPersonData'
import {AddWorkData} from '../../pageobjects/add-workdata/AddWorkData';


test ('registration',async({page},testInfo) => {  

    
    const navigateToReg = new NavigateToReg(page)
    await navigateToReg.registrationPage()

    const addPersonData = new AddPersonData(page)
    await addPersonData.addPersonalData('Sofía','Flores','30','Colombia','F','sofi_flowers@gmail.com')

    const addWorkData = new AddWorkData(page)
    await addWorkData.addWorkData('monday','tuesday','','','friday','images/swag.JPG')   // comillas vacías se pasan para indicar día no laboral

    const [summaryPage] = await Promise.all(   //summarypage es la nueva tab q nos abrió
        [
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'Guardar' }).click()
        ]

    )

    await summaryPage.waitForLoadState();
    await expect(summaryPage).toHaveTitle('Summary');

    
    
});