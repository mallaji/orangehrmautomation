const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/orangelogin');

// Define the devices to test with their respective viewport sizes
const devicesToTest = [
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Android', width: 412, height: 915 }
];

devicesToTest.forEach(device => {
    test(`Login Test - ${device.name}`, async function({ page }) {
        // Set the viewport size to simulate the device
        await page.setViewportSize({ width: device.width, height: device.height });

        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');

        // Verify login using screenshot
        await loginPage.verifyLogin(device.name);
    });
});
