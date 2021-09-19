/**
 * Originally a duplicate of test file for application me-angular
 * Functional/UI tests for frontend application trade-angular
 */
"use strict";
const uuid = require("uuid");
const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const By = webdriver.By;

// The Selenium Webdriver object:
let browser = new webdriver.Builder().forBrowser("chrome").build();

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  })
}

// Use case 1 open browser
describe("Trade-app", function() {
    // does something before execution of each test case in the test suite:
    beforeEach(async function() {
        this.timeout(100000);
        await browser.get("http://localhost:3000");
    });

    // does something after execution of each test case in the test suite:
    afterEach(function(done) {
        //browser.quit();
        done();
    });

 
    // Use case 2 Page renders, title exists:
    it("Page renders, title exists", async function() {
      console.log(browser); 
      const elements = await browser.findElements(By.id("submit-button"))
      assert(elements.length>0);    
    });

    it("Test index", async function() {
      const title = await browser.getTitle() 
          assert(title == "React App");
    });

    // Use case 3 "Test if button returns filename from textfield":
    it("", async function() {
      console.log(browser); 
      const input = await browser.findElement(By.id("text-input"))
      assert(input);

      const filename = `test-${uuid.v4()}.txt`;
      await input.sendKeys(Array(20).fill(String.fromCharCode(8)).join(''));
      await input.sendKeys(filename);
      const button = await browser.findElement(By.id("submit-button"))
      assert(button);
      button.click();
      this.timeout(3000);
      await sleep(2000);
      const select = await browser.findElement(By.id("file-select"));
      const options = await select.findElements(By.xpath(".//option"));
      
      const optionsTexts = await Promise.all(options.map((option) => option.getText()));
      console.log(optionsTexts);
      assert(optionsTexts.find((option) => option == filename));
    });

});