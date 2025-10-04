import {test,expect} from '@playwright/test'

test ('registration',async({page},testInfo) => {  

    await page.goto('http://127.0.0.1:5500/register.html');

    const name='Julito'
    const lastName='Pérez Rodríguez'
    const age = '44'
    const country = 'Colombia'
    const email = 'julito.perez.rguez@hotmail.co'
    const sex='M'
    
    await page.getByRole('textbox', { name: 'Nombre'}).fill(`${name}`);
    await page.getByRole('textbox', { name: 'Apellido:' }).fill(`${lastName}`);
    //await page.getByRole('spinbutton', { name: 'Edad:' }).fill('45');
    await page.locator("xpath= //label[contains(.,'Edad')]/following-sibling::input").fill(`${age}`);
    await page.locator("id=country").selectOption(`${country}`);
    await page.locator(`input[value='${sex}']`).click();
    await page.locator("id=email").fill(`${email}`);
    await page.locator("id=monday").click();
    await page.locator("id=tuesday").click();
    await page.locator("id=friday").click();
    await page.locator("id=picture").setInputFiles('images/swag.jpg');   

    //await page.screenshot({path: 'screenshots/register1.png', fullPage: true});
    //const screenshot = await page.screenshot(({path: 'screenshots/register1.png', fullPage: true}));
    await testInfo.attach('register1.png', { 
        body: await page.screenshot({fullPage:true}),
        contentType: 'image/png'

    })
    
    const [summaryPage] = await Promise.all(   //sumarypage es la nueva tab q nos abrió
        [
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'Guardar' }).click()
        ]

    )

    await summaryPage.waitForLoadState();
    await expect(summaryPage).toHaveTitle('Summary');

    const currentName = await summaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::p").textContent();
    const currentLastName = await summaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::p").textContent();
    const currentAge = await summaryPage.locator("//strong[contains(.,'Edad')]/ancestor::p").textContent();

    expect(currentName).toContain(name);
    expect(currentLastName).toContain(lastName);
    expect(currentAge).toContain(age);
    //await summaryPage.screenshot({path: 'screenshots/register2.png', fullPage: true });
    await testInfo.attach('register2.png',  { 
        body: await summaryPage.screenshot({fullPage:true}), 
        contentType: 'image/png'

    })

    await page.pause();

});

test ('registration failure',async({page}) => {  

    await page.goto('http://127.0.0.1:5500/register.html');

    const name='Ana'
    const lastName='López González'
    const age = '33'
    const country = 'Brasil'
    const email = 'anita.lopez.glez@hotmail.br'
    const sex='F'
    
    await page.locator("id=name").fill(name);
    expect(true).toEqual(false);

});