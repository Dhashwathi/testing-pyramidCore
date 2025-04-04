import {test,expect} from '@playwright/test'

test.describe("Testing Dashboard functionality",()=>{
    test("Testing dashboard",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("######");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle'); 
        const contentsFrame = page.frame({ name: "contents" });
        await contentsFrame.locator("#PCIMenut0").click();
        const mainFrame = page.frame({ name: "main" });
        const checkBox= mainFrame.locator("#rdSelf");
        //dashboard is enabled
        await expect(checkBox).toBeChecked(); 
        await mainFrame.click("#lnkAttendance");
        const days=await mainFrame.locator("#lnkAttendance").innerText();
        const nday=parseInt(days);
        //console.log(nday);
        await mainFrame.waitForSelector("//tr[@class='griditem']");
        await mainFrame.waitForSelector("//tr[@class='gridalternetitem']")
        const rows= mainFrame.locator("//tr[@class='griditem']")
        const arows=mainFrame.locator("//tr[@class='gridalternetitem']")
        const rcount=await rows.count();
        const acount=await arows.count();
        //assert
        await expect(rcount+acount).toBe(nday);
        await mainFrame.locator("#rdTeam").click();
        await mainFrame.waitForSelector("#lblTodayDueTickets")
        //assert
        await expect(mainFrame.locator("#lblTodayDueTickets")).toBeVisible();
        const topframe=page.frame({ name: "top" });
        await topframe.locator(".logout").click();
        //assert
        await expect(page.locator('#pydLogin_lblMsg')).toHaveText("You have been logged out successfully.");
       })

})