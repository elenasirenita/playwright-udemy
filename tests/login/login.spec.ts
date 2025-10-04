import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pageobjects/login/LoginPage';
import {faker} from '@faker-js/faker'
import { AddTransactionPage } from '../../pageobjects/add-transactions/AddTransactionPage';
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';

test ('login',async({page}) => {
    
    
    await test.step('Navigating to login page',async() =>{
        const navigateTo = new NavigateTo(page)
        await navigateTo.loginPage()
    })

    
    const transacDate='2025-12-22'
    const transacAmount=faker.number.int({min:10, max:2000}).toString()
    const transacDesc=faker.company.catchPhrase()

    await test.step('Authentication with correct credentials',async() =>{
        const logPage = new LoginPage(page)
        await logPage.doLogin('user','pass') 
    })
    
   
    await page.waitForLoadState('networkidle')
    
    await test.step('Add transaction',async() =>{
        const addTransactionPage = new AddTransactionPage(page)
        addTransactionPage.addTransaction(transacDate, transacAmount,transacDesc) 
        expect(await addTransactionPage.getActualAmount("1")).toEqual(transacAmount)
        expect(await addTransactionPage.getActualDate("1")).toEqual(transacDate)
        expect(await addTransactionPage.getActualDescription("1")).toEqual(transacDesc)

        addTransactionPage.addTransaction('2022-12-25', '2111','perros y gatos')

        expect(await addTransactionPage.getActualAmount("2")).toEqual('2111')
        expect(await addTransactionPage.getActualDate("2")).toEqual('2022-12-25')
        expect(await addTransactionPage.getActualDescription("2")).toEqual('perros y gatos')

        addTransactionPage.addTransaction('2020-08-12', '33','sapos y ranas')

        expect(await addTransactionPage.getActualAmount("3")).toEqual('33')
        expect(await addTransactionPage.getActualDate("3")).toEqual('2020-08-12')
        expect(await addTransactionPage.getActualDescription("3")).toEqual('sapos y ranas')
    })

    
    
    
   
    //await page.pause()
});