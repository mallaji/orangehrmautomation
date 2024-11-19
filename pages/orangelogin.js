const { expect } = require("@playwright/test");
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `./env/.env.${env}` });

class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = process.env.BASEURL; // Use of environment variable for URL
        this.useridSelector = "//input[@name='username']";
        this.passidSelector = "//input[@class='oxd-input oxd-input--active' and @type='password' and @name='password' and @placeholder='Password']";
        this.subidSelector = "//button[contains(@class, 'oxd-button--main') and contains(@class, 'orangehrm-login-button')]";
    }

    async navigate() {
        try {
            await this.page.goto(this.url);
        } catch (error) {
            console.error(`Error navigating to ${this.url}:`, error);
            throw new Error(`Timeout occurred while navigating to ${this.url}.`);
        }
    }

    async login(username, password) {
        try {
            await this.page.fill(this.useridSelector, username, { delay: 70 });
            await this.page.fill(this.passidSelector, password, { delay: 70 });
            await this.page.click(this.subidSelector);
        } catch (error) {
            console.error("Error occurred during login:", error);
            throw new Error("Login process encountered an error.");
        }
    }

    async verifylogin() {
        try {
            await expect(this.page).toHaveScreenshot('image.png');  
        } catch (error) {
            const timestamp = new Date().toISOString();
            console.error("Error occurred while verifying login:", error);
            throw new Error(`Verification of login failed at ${timestamp}. Error: ${error.message}`);
        }
    }
    // async verifyLogin(deviceName) {
    //     try {
    //         const screenshotPath = `screenshots/${deviceName}_login.png`;
    //         await expect(this.page).toHaveScreenshot(screenshotPath);
    //     } catch (error) {
    //         const timestamp = new Date().toISOString();
    //         console.error("Error occurred while verifying login:", error);
    //         throw new Error(`Verification of login failed at ${timestamp}. Error: ${error.message}`);
    //     }
    // }
}

module.exports = LoginPage;

