import {test,expect} from '@playwright/test'

test.beforeEach("Logging In before each test start",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("#######");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle');
        const contentsFrame = page.frame({ name: "contents" });
        await contentsFrame.locator("#PCIMenut29").click();
        await contentsFrame.locator("#PCIMenut30").click();
        await contentsFrame.locator("#PCIMenut32").click(); 
})

test.describe("Testing DOB and Anniversary Details functionality",()=>{
    test("Testing Dob and anniversary details",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        //with default and only selecting Branch
        await mainFrame.click("#ddlBranch");
        await mainFrame.locator("#ddlBranch").selectOption({label:"Hyderabad"});
        await mainFrame.click("#btnSearch");
        //assert
        const mon=await mainFrame.locator("//td[contains(text(),'Apr')]").textContent();
        expect(mon).toContain("Apr");

        await mainFrame.click("#ddlBranch");
        await mainFrame.locator("#ddlBranch").selectOption({label:"All"});
        await mainFrame.click("#ddlDept");
        await mainFrame.locator("#ddlDept").selectOption({label:"Software"});
        await mainFrame.click("#ddlMonth");
        await mainFrame.locator("#ddlMonth").selectOption({label:"September"});
        await mainFrame.click("#btnSearch");
        //assert
        const smonth=await mainFrame.locator("(//td[contains(text(),'Sep')])[1]").textContent();
        expect(smonth).toContain("Sep");
        await page.waitForTimeout(3000);
     })

     test("Testing for no records found",async({page})=>{
        const mainFrame = page.frame({ name: "main" });
        await mainFrame.click("#ddlCompany");
        await mainFrame.locator("#ddlCompany").selectOption({label:"Pyramid Consulting, Inc UK Ltd"});
        await mainFrame.click("#ddlBranch");
        await mainFrame.locator("#ddlBranch").selectOption({label:"All"});
        await mainFrame.click("#ddlDept");
        await mainFrame.locator("#ddlDept").selectOption({label:"All"});
        await mainFrame.click("#ddlMonth");
        await mainFrame.locator("#ddlMonth").selectOption({label:"All"});
        await mainFrame.click("#btnSearch");
        //assert
        const msg=await mainFrame.locator("//font[normalize-space()='No Record Found']").textContent();
        await expect(msg).toContain("No Record Found");
        await page.waitForTimeout(3000);
     })

})

test.afterEach("Logging out after each test is completed",async({page})=>{
    const topframe=page.frame({ name: "top" });
    await topframe.locator(".logout").click();
})