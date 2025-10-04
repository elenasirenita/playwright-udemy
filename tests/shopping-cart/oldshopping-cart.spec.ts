import {test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test ('buying new products',async({page}) => {  

    await page.goto('http://127.0.0.1:5500/');

    await page.locator("//h5[contains(.,'Producto 3')]//ancestor::div[contains(@class,'card-body')]//button").click();
    await page.locator("//h5[contains(.,'Producto 2')]//ancestor::div[contains(@class,'card-body')]//button").click();

    for (let i=0;i<=5;i++) {
        await page.locator("//h5[contains(.,'Producto 1')]//ancestor::div[contains(@class,'card-body')]//button").click();
    }   

    await page.locator("button#view-cart-btn").click();

    const product1Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr/td[3]").textContent();
    const product2Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr/td[3]").textContent();
    const product3Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr/td[3]").textContent();

    expect(product1Quantity).toEqual('6');
    expect(product2Quantity).toEqual('1');
    expect(product3Quantity).toEqual('1');

    await page.locator("button#checkout-btn").click();

    await page.locator("input#name").fill(faker.person.fullName());
    await page.locator("input#address").fill(faker.location.streetAddress());
    await page.locator("input#email").fill(faker.internet.email());

    await page.waitForLoadState('networkidle');

    await page.locator("//a[contains(.,'de pago')]").click();
    //await page.locator("//a[@href='#personalInfo']").click();    //otra manera, hay que verificarlo

    await page.locator("input#card-number").fill(faker.finance.creditCardNumber());
    await page.getByRole('textbox', { name: 'Fecha expiración:' }).fill('11/30');
    await page.getByRole('textbox', { name: 'CVV:' }).fill('654');

    await page.locator("//button[contains(.,'Pagar')]").click();

    await expect(page.getByRole('heading', { name: 'Resumen de tu compra'})).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Información personal'})).toBeVisible();
    await expect(page.getByRole('heading', { name: '¡Tu compra fue exitosa!'})).toBeVisible();
    await expect(page.getByRole('heading', { name: '¡Tu compra fue exitosa!'})).toHaveCSS("color","rgb(40, 167, 69)");
    await expect(page.getByText("¡Tu compra fue exitosa!")).toHaveCSS("color","rgb(40, 167, 69)");  //otra manera
    const elTotal = await page.locator("//strong[contains(.,'Total')]/ancestor::td/following-sibling::td/strong").textContent();
    console.log(elTotal);
   
    expect(elTotal).toEqual('$110.00');
     
    await page.pause();


});