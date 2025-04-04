import {test,expect} from '@playwright/test'

test.describe("Testing login page functionality",()=>{
    test("Testing login page with valid credentials",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("######");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle'); 
        const frame = page.frame({ url: /PCItop\.aspx/}); 
        await expect(frame.locator("#lblUserName")).toContainText("Hello,  Dhashwathi");
       })

    test("Testing login page with invalid credentials",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("#######");
        await page.click('#pydLogin_btnLogin');
        await expect(page.locator("#pydLogin_lblMsg")).toHaveText("* User not found Or User/Password not matching");
    })

    test("Testing login page forget password",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.click('.txt1');
        const frame = await page.frameLocator("//iframe[@src='PCIForget.aspx']");
        await frame.locator("(//input[@id='txtemail'])[1]").fill("Dhashwathi@celsiortech.com")
        await expect(frame.locator("#btngo")).toBeEnabled();
    })

    test("Testing login page links",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await expect(page.locator("//a[normalize-space()='here']")).toBeEnabled();
        await expect(page.locator("//a[normalize-space()='oms-pyramid@pyramidconsultinginc.com']")).toBeEnabled();
        
    })


})
