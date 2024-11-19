const {expect} = require("@playwright/test")

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `./env/.env.${env}` });

class Adduser {
    constructor(page) {
        this.page = page;
        this.adminid = "//a[@class='oxd-main-menu-item' and @href='/web/index.php/admin/viewAdminModule']//span[text()='Admin']";
        this.addbuttonid = "(//button[contains(@class, 'oxd-button') and contains(@class, 'oxd-button--medium') and contains(@class, 'oxd-button--secondary')])[2]";
        this.addusertitle="//h6[text()='Add User']";
        this.roleid="(//div[contains(@class, 'oxd-select-text') and contains(@class, 'oxd-select-text--active')])[1]";
        this.adminOption = this.page.getByRole('option', { name: 'Admin' });
        this.employeename = "//input[@placeholder='Type for hints...']";
        this.josephEvansOption = this.page.getByText('Joseph Evans');
        this.status="(//div[contains(@class, 'oxd-select-text') and contains(@class, 'oxd-select-text--active')])[2]";
        this.selectstatus = this.page.getByRole('option', { name: 'Enabled' });
        this.username= "div[class='oxd-form-row'] div[class='oxd-grid-2 orangehrm-full-width-grid'] div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']";
        this.password="(//input[@type='password'])[1]";
        this.confirmpassword= "(//input[@type='password'])[2]";
        this.save= "//button[@type='submit']";
    }

    async verifyaddusertitle(){
        try {
            await expect(this.page.locator(this.addusertitle)).toBeVisible();
        } catch (error) {
            console.error("Add User title is not visible:", error);
            throw error; 
        }
    }

    async addadmin() {
        try {
            await this.page.click(this.adminid);
            await this.page.click(this.addbuttonid);
            await this.page.click(this.roleid);
            await this.adminOption.click();
            await this.page.fill(this.employeename, "Evans", { delay: 70 });
            await this.josephEvansOption.click();
            await this.page.click(this.status);
            await this.selectstatus.click();
            await this.page.fill(this.username, "milan.malla", { delay: 100 });
            await this.page.fill(this.password, "Include.1", { delay: 100 });
            await this.page.fill(this.confirmpassword, "Include.1", { delay: 100 });
            await this.page.click(this.save);
            //await this.page.pause();
        } catch (error) {
            console.error("Error occurred during addadmin:", error);
            throw new Error("Timeout occurred during form submission in addadmin method.");
        }
    }
    
}

module.exports = Adduser;