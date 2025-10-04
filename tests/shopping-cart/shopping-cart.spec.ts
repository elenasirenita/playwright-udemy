import {test,expect} from '@playwright/test'
import { NavigateToSC } from '../../pageobjects/navigate/NavigateToSC'
import { SelectProducts } from '../../pageobjects/select-products/SelectProducts'
import { Checkout } from '../../pageobjects/add-checkoutdata/Checkout';


test ('buying new products',async({page}) => {  

    // selecciono 3 unidades de prod1, 1 de prod2 y 2 de prod3
    const cant1= '3'  
    const cant2= '1'
    const cant3= '2'

    const navigateToSC = new NavigateToSC(page)
    await navigateToSC.openSelectProductsPage()

    const selectprods = new SelectProducts(page)
    await selectprods.addProductsToCart(cant1,cant2,cant3)  // selecciono 3 unidades de prod1, 1 de prod2 y 2 de prod3
    await selectprods.viewShoppingCart() 

    await selectprods.validateQuantitiesColumn(cant1,cant2,cant3)
    await selectprods.doCheckout()

    await page.waitForLoadState('networkidle');
    
    const pagar = new Checkout(page)

    await pagar.fillPersonalInfo()

    await pagar.fillPaymentInfo() 
    await pagar.doPay()
    await pagar.validateSuccessfulPurchase() 
    
   
});