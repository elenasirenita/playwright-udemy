import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pageobjects/login/LoginPage';
import {faker} from '@faker-js/faker'
import { AddTransactionPage } from '../../pageobjects/add-transactions/AddTransactionPage';

test ('login',async({page}) => {
    
    await page.goto('http://127.0.0.1:5501/login.html')

    /*    --- los comento para usar lo de Page Object pattern
    await page.locator('input#username').fill('user') 
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()   */
    
    const transacDate='2025-12-22'
    const transacAmount=faker.number.int({min:10, max:2000}).toString()
    const transacDesc=faker.company.catchPhrase()

    const logPage = new LoginPage(page)
    
    // --- los comento para usar la mejora de Page Object pattern
    // await logPage.fillPassword()
    // await logPage.fillUsername()
    // await logPage.clickOnLoginButton()
    await logPage.doLogin('user','pass')

    await page.waitForLoadState('networkidle')
    /*
    await page.locator('//button[contains(text(), "adir transacc")]').click()
    await page.locator('id=date').fill('2025-09-28')
    await page.locator('id=amount').fill('1250')
    await page.locator('id=description').fill('Focused tangible challenge')
    await page.locator("//button[contains(text(),'Guardar')]").click()
    */
   const addTransactionPage = new AddTransactionPage(page)
   addTransactionPage.addTransaction(transacDate, transacAmount,transacDesc)
   
   
   const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
   const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
   const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()

   expect(actualDate).toEqual(transacDate)
   expect(actualAmount).toEqual(transacAmount)
   expect(actualDescription).toEqual(transacDesc)

    //await page.pause()

});


test ('login failed',async({page}) => {
    
    await page.goto('http://127.0.0.1:5501/login.html')

    const logPage = new LoginPage(page);
    /*
    await logPage.fillUsername();
    await logPage.fillPassword();
    await logPage.clickOnLoginButton(); */
    await logPage.doLogin('user','pass')

    await page.locator('//button[contains(text(), "adir transacc")]').click()
    await page.waitForLoadState()
    await page.locator('//button[contains(text(), "adir transacc")]').click()
    await page.locator('id=date').fill('2025-09-28')
    await page.locator('id=amount').fill('1250')
    await page.locator('id=description').fill(faker.animal.insect())
    await page.locator("//button[contains(text(),'Guardar')]").click()

    const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
    const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()

    expect(actualDate).toEqual('2025-09-28')
    expect(actualAmount).toEqual('1250')
    //expect(actualDescription).toEqual('Una descripción')

    //await page.pause()

});