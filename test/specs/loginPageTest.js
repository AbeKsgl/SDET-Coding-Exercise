import chai from "chai";
import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";
import { Utility } from "../utils/Utilitiy.js";

const expect = chai.expect;

describe("Login Page", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  /**
   * Common assertions
   * @param {*} expectedErrorMessage
   * @param {*} expectedErrorColor
   * @example await commonAssertion(expectedErrorMessage,expectedErrorColor )
   */
  async function commonAssertion(expectedErrorMessage, expectedErrorColor) {
    const erorMessage = await LoginPage.readFlashAlert();
    const errorColor = await LoginPage.getColor();

    await expect(erorMessage, "should emit error message").to.equal(
      expectedErrorMessage
    );
    await expect(errorColor, "error message color should be").to.equal(
      expectedErrorColor
    );
  }

  it("should login with valid credentials ", async () => {
    // Define test data
    const expectedSuccessColor = "#5da423";
    const expectesPageTitle = "The Internet";
    const url = "https://the-internet.herokuapp.com/login";
    const expectedPageHeader = "Login Page";
    const loginMessage = "You logged into a secure area!";
    const logoutMessage = "You logged out of the secure area!";

    // Get login credentials.
    const username = await LoginPage.readUsername();
    const password = await LoginPage.readPassword();

    // Get page information before and after login.
    const currentUrl = await browser.getUrl();
    const pageTitle = await browser.getTitle();
    await LoginPage.login(username, password);
    const loginResult = await SecurePage.readFlashAlert();
    const successColor = await SecurePage.getColor();
    const secureArea = await SecurePage.readWelcomeMessage();

    // Logout and get information after logout
    await SecurePage.goBtnLogout();
    const logoutResult = await LoginPage.readFlashAlert();
    const pageHeader = await LoginPage.readPageHeader();

    // Assertions
    await expect(currentUrl, "URL should be correct").to.equal(url);
    await expect(pageTitle, "should land on correct page").to.equal(
      expectesPageTitle
    );
    await expect(loginResult, "success message should be").to.equal(
      loginMessage
    );
    await expect(successColor, "success message color should be").to.equal(
      expectedSuccessColor
    );
    await expect(secureArea, "should display welcome message").to.include(
      "Welcome to the Secure Area."
    );
    await expect(logoutResult, "logut success message should be").to.equal(
      logoutMessage
    );
    await expect(pageHeader, "should have correct page header").to.equal(
      expectedPageHeader
    );
  });

  it("should fail login with incorrect password", async () => {
    // Define test data
    const expectedErrorColor = "#c60f13";
    const expectedErrorMessage = "Your password is invalid!";

    // Get an incorrect password and the correct username
    const username = await LoginPage.readUsername();
    const password = Utility.generateRandomCeredentails(12);

    // Attempt login with incorrect password
    await LoginPage.login(username, password);

    // Assertions
    await commonAssertion(expectedErrorMessage, expectedErrorColor);
  });

  it("should fail login with incorrect username", async () => {
    // Define test data
    const expectedErrorColor = "#c60f13";
    const expectedErrorMessage = "Your username is invalid!";

    // Get an incorrect password and the correct username
    const username = Utility.generateRandomCeredentails(12);
    const password = await LoginPage.readPassword();

    // Attempt login with incorrect username
    await LoginPage.login(username, password);

    // Assertions
    await commonAssertion(expectedErrorMessage, expectedErrorColor);
  });

  it("should fail login with incorrect ceredentials", async () => {
    // Define test data
    const expectedErrorColor = "#c60f13";
    const expectedErrorMessage = "Your username is invalid!";

    // Get an incorrect password and the correct username
    const username = Utility.generateRandomCeredentails(12);
    const password = Utility.generateRandomCeredentails(10);

    // Attempt login with incorrect ceredential
    await LoginPage.login(username, password);

    // Assertions
    await commonAssertion(expectedErrorMessage, expectedErrorColor);
  });

  it("should fail login with emty ceredentials", async () => {
    const expectedErrorColor = "#c60f13";
    const expectedErrorMessage = "Your username is invalid!";

    // Attempt login with empty ceredential
    await LoginPage.loginOnly();

    // Assertions
    await commonAssertion(expectedErrorMessage, expectedErrorColor);
  });
});
