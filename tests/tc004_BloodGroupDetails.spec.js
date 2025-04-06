import {test,expect} from '@playwright/test'

test.describe("Testing Blood group details functionality",()=>{
    test("Testing BG details",async({page})=>{
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        await page.locator("#pydLogin_txtUserid").fill("Dhashwathi.M@celsiortech.com");
        await page.locator("#pydLogin_txtUserPwd").fill("#########");
        await page.click('#pydLogin_btnLogin');
        await page.waitForLoadState('networkidle'); 
        const contentsFrame = page.frame({ name: "contents" });
        await contentsFrame.locator("#PCIMenut29").click();
        await contentsFrame.locator("#PCIMenut30").click();
        await contentsFrame.locator("#PCIMenut33").click();
        const mainFrame = page.frame({ name: "main" });
        const val=await mainFrame.locator("//select[@id='ddlCompany']//option[2]").textContent();
        //assert
        expect(val).toContain("Celsior Technologies Pvt Ltd");
        await mainFrame.locator("#btnSearch").click();
        //assert
        const res= await mainFrame.locator("//table[@id='dgBloodGroup']//tr//td//a[normalize-space()='Resource']").textContent();
        expect(res).toBe("Resource");

        await mainFrame.locator("#ddlBGroup").click();
        await mainFrame.locator("#ddlBGroup").selectOption({label:"O+"});
        await mainFrame.locator("#btnSearch").click();
        //assert
        const Ogroup= await mainFrame.locator("(//td[contains(text(),'O+')])[1]").textContent();
        expect(Ogroup).toBe("O+");

        await mainFrame.waitForSelector("#ddlDept");
        await mainFrame.locator("#ddlDept").click();
        await mainFrame.locator("#ddlDept").selectOption({label:"Genspark"});
        await mainFrame.locator("#btnSearch").click();
        //assert
        const msg= await mainFrame.locator("//font[normalize-space()='No Matching Record Found']").textContent();
        await expect(msg).toContain("No Matching Record Found");


    })
})