import {test,expect} from '@playwright/test'

test.beforeEach("Loggin in Before each test",async({page})=>{
    await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("#######");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle'); 
        const contentsFrame = page.frame({ name: "contents" });
        await contentsFrame.locator("#PCIMenut47").click();
})

test.describe("Testing Hyd seat Booking feature",()=>{
    test("Testing Seat Booking with valid credentials",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        await mainFrame.locator("#mat-input-0").fill("05/05/2025");
        await mainFrame.click("#mat-select-value-1");
        await mainFrame.click("#mat-option-45");
        await mainFrame.click("//span[normalize-space()='Book']");
        expect(mainFrame.locator("[class='mat-simple-snack-bar-content']")).toHaveText("Your seat has been successfully booked!");
        //await page.waitForTimeout(3000);
    })

    test("Testing Seat Booking with invalid credentials",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        await mainFrame.locator("#mat-input-0").fill("05/05/2025");
        await mainFrame.click("#mat-select-value-1");
        await mainFrame.click("#mat-option-42");
        await mainFrame.click("//span[normalize-space()='Book']");
        //booking the already booked seat
        expect(mainFrame.locator("[class='mat-simple-snack-bar-content']")).toHaveText("This seat is already reserved. Please choose another one.");
        //await page.waitForTimeout(3000);
    })
    test("Testing Seat Booking without credentials",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        await mainFrame.locator("#mat-input-0").fill("05/05/2025");
        await mainFrame.click("//span[normalize-space()='Book']");
        //booking the already booked seat
        expect(mainFrame.locator("[class='mat-simple-snack-bar-content']")).toHaveText("Please select desk.");
        //await page.waitForTimeout(3000);
    })

    test("Testing view/cancel Booking",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        await mainFrame.click("//span[normalize-space()='View/Cancel Your Booking']");
        await mainFrame.locator("(//td//input[@class='ng-untouched ng-pristine ng-valid'])[1]").check()
        await mainFrame.click("//span[normalize-space()='Cancel Booking']");
        //Unbook the seat
        expect(mainFrame.locator("[class='mat-simple-snack-bar-content']")).toHaveText("Your seat booking has been cancelled successfully.");
        await page.waitForTimeout(3000);
    })

})
test.afterEach("Logging out after each test is completed",async({page})=>{
    const topframe=page.frame({ name: "top" });
    await topframe.locator(".logout").click();
})