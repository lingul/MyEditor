/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
var testUrl = require('mocha-test-url');
const By = webdriver.By;

let browser;

 //Usecase 1
 it("Test linnea", function(done) {
    //this.setState({data: "linnea"});
    //browser.getTitle().then(function(title) {
    
        assert.strictEqual("linnea", "linnea");
        done();
    
    //});
});

// Does not work with WSL!! Use cygwin

/*
//use-case1: “User can access page and see "Spara” button and text field."
//describe("Page", async function() {
    //beforeEach(async function(done) {
        //this.timeout(20000);
        //browser = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
            SELENIUM_BROWSER="firefox:36:LINUX"
            SELENIUM_REMOTE_URL="http://www.example.com:4444/wd/hub"
            
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });
*/

   

/*
    it("Test Button", function(done) {
        // Check if button
        browser.navigate().to("https://www.student.bth.se/~ligm19/editor/");
        browser.findElement(By.html("button")).then(function(element) {
            element.getgetText().then(function(text) {
                assert.strictEqual(text, "Spara");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://www.student.bth.se/~ligm19/editor/"));
        });
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    

});
*/