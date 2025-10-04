const { chromium } = require("@playwright/test");
const { spawn } = require("child_process");

(async () => {

    const chrome = spawn(
        `"c:/Program Files/Google/Chrome/Application>chrome.exe"`,
        ["--remote-debugging-port=9222"],
        {shell:true}
    )

    await new Promise(r => setTimeout(r,3_000))
    const browser = await chromium.connectOverCDP("http://localhost:9222")
    const defaultContext = browser.contexts()[0]
    const page = defaultContext.pages()[0]
    await page.goto("https://www.linkedin.com/mynetwork/")

    const occupation = "//span[contains(@class,'discover-person-card__occupation')]"
    const allContactsFromBogota = '//h2[contains(.,"People you may know in Bogotá D.C Metropolitan Area")]/ancestor::div[@class="discover-sections-list__item"]//ul//li'
    const connectButton  = "//button[contains(.,'Connect')]"
    const contactName = "//span[contains(@class,'discover-person-card__name')]"
    await page.waitForTimeout(7000)

    //scrolls

    for (let i=0;i<4;i++) {
        await page.evaluate(() => window.scrollBy(0,document.body.scrollHeight))
        await page.waitForTimeout(3_000)
    }

    const allContacts = await page.locator(allContactsFromBogota).all()
    await allContacts.at(0).scrollIntoViewIfNeeded()

    console.log("number of contacts",allContacts.length)
    for (let contact of allContacts) {   //imprime rol de cada persona encontrada

        let currentRole = await contact.locator(occupation).textContent()
        console.log(currentRole)

    }

    const matches = ["pruebas","automation","qa"]
    const contactsThatMatch = []
    for (let contact of allContacts) {
        let currentRole = await contact.locator(occupation).textContent().then(X=>X.toLowerCase())
        for (let match of matches) {
           if (currentRole.includes(match)) {
               contactsThatMatch.push(contact)
               break
           }
        }
    }
    console.log("End: All contacts that match")
    console.log("Contacts that match: ", contactsThatMatch.length)

    for(let contact of contactsThatMatch) {
        let currentRole = await contact.locator(occupation).textContent()
        let currentName = await contact.locator(contactName).textContent()
        await contact.locator(connectButton).click()
        console.log("Inviting to",currentName)
        console.log("Adding the role",currentRole)
        await page.waitForTimeout(4_000)
    }

})
()