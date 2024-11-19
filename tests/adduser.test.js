const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/orangelogin');
const Adduser = require('../pages/adduser')

//test.use({ headless: true }); 

test("Add Admin User", async function({ page }) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await loginPage.verifylogin();
    await loginPage.verifyLogin(); //Test Responsiveness

    //await expect(page).toHaveURL(/dashboard/);

    // Add Admin
    const adduser= new Adduser(page);
    await adduser.addadmin();

    //Verify 
    await adduser.verifyaddusertitle()
});
