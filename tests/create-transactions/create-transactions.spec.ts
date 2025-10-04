import {test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test ('create transactions',async({page}) => {

await page.goto('http://127.0.0.1:5501/login.html');

await page.locator('input#username').fill('user');
await page.locator('input#password').fill('pass');
await page.locator('//button[@type=\'submit\']').click();
await page.waitForLoadState('networkidle');

    for (let i=0;i<=7;i++) {
        await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
        //await page.locator('id=date').fill('2025-09-28');
        await page.locator('id=date').fill(faker.date.between({from: '2000-01-01', to: '2026-12-31'}).toISOString().split('T')[0]);
        await page.locator('id=amount').fill(faker.number.int({min:10, max:2000}).toString());
        //await page.locator('id=description').fill('Una descripción');
        await page.locator('id=description').fill(faker.person.jobDescriptor());
        await page.locator("//button[contains(text(),'Guardar')]").click();
    }
await page.pause();

})