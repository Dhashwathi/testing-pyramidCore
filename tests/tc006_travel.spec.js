import {test,expect} from '@playwright/test'

test.beforeEach("Logging In before each test start",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("######");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle');
        const contentsFrame = page.frame({ name: "contents" });
        await contentsFrame.locator("#PCIMenut26").click();
        await contentsFrame.locator("#PCIMenut27").click();
        
})

test.describe("Testing travel functionality",()=>{
    test("Testing travel request with domestic option",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        //assert for domestic button is already clicked
        await expect(mainFrame.locator("#Domestic")).toBeChecked();
        await mainFrame.getByPlaceholder("From").fill("Hyderabad");
        await mainFrame.getByPlaceholder("To").fill("Noida");
        await mainFrame.locator("//input[@type='date']").fill("2025-04-20");
        await mainFrame.locator("#Accomodation").check();
        await mainFrame.locator("#Taxi").check();
        await mainFrame.locator("#FullDay").check();
        await mainFrame.click("#btnAddCity");
        const n=await mainFrame.locator("(//div[@class='table-responsive mt-3'])[1]//td[1]").textContent();
        //assert its added
        expect(n).toBe("Hyderabad");
        
    })
    test("Testing a deletion functionality",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        page.on('dialog', async (dialog) => {
            console.log(dialog.message()); // Logs: Are you sure want to delete the request?
            await dialog.accept(); // Clicks "OK"
        });
        await mainFrame.locator("(//img[@alt='Delete'])[1]").click();
        const empty=await mainFrame.locator("(//div[@class='table-responsive mt-3'])[1]//tr");
        const count=await empty.count();
        //console.log(count);
        //assert count 1 that means table header only present, table is empty.
        expect(count).toBe(1);
    })
    test("Testing travel request with InterNational option",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        //assert for domestic button is already clicked
        await mainFrame.locator("#InterNational").check();
        await mainFrame.getByPlaceholder("From").fill("Hyderabad");
        await mainFrame.locator("//input[@placeholder='To']").fill("Canada");
        await mainFrame.locator("//input[@type='date']").fill("2025-05-20");
        await mainFrame.locator("#Accomodation").check();
        await mainFrame.click("#btnAddCity");
        const n=await mainFrame.locator("(//div[@class='table-responsive mt-3'])[1]//td[2]").textContent();
        //assert its added
        expect(n).toBe("Canada");
        
    })
})

test.afterEach("Logging out after each test is completed",async({page})=>{
    const topframe=page.frame({ name: "top" });
    await topframe.locator(".logout").click();
})