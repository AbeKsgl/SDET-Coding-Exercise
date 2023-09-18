import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class LoginPage
 */
class LoginPage extends Page {
  /**
   * login credential selector
   */
  get subHeader() {
    return $$(".subheader em");
  }

  /**
   * username input selector
   */
  get inputUsername() {
    return $("#username");
  }

  /**
   * password input selector
   */
  get inputPassword() {
    return $("#password");
  }

  /**
   * login button selector
   */
  get btnSubmit() {
    return $('button[type="submit"]');
  }

  /**
   * Login page header selector
   */
  get header() {
    return $(".example h2");
  }

  /**
   * logout success message selector
   */
  get flashAlert() {
    return $("#flash");
  }

  /**
   * Gets the username from the subheader
   * @returns {string}
   */
  async readUsername() {
    return (await this.subHeader[0]).getText();
  }

  /**
   * Gets the password from the subheader
   * @returns {string}
   */
  async readPassword() {
    return (await this.subHeader[1]).getText();
  }

  /**
   * Will create login
   * @example await login()
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * Will create login
   * @example await login()
   */
  async loginOnly() {
    await this.btnSubmit.click();
  }

  /**
   * Gets the logout success message
   * @returns {string}
   * @example await readFlashAlert()
   */
  async readFlashAlert() {
    return (await this.flashAlert.getText()).split("\n")[0];
  }

  /**
   * Gets the background-color
   * @returns {string}
   * @example await getColor()
   */
  async getColor() {
    const color = (await this.flashAlert).getCSSProperty("background-color");
    return (await color).parsed.hex;
  }

  /**
   * Gets the login page header
   * @returns {string}
   * @example await readPageHeader()
   */
  async readPageHeader() {
    return await this.header.getText();
  }

  /**
   * landing page
   * @example await open()
   */
  open() {
    return super.open("login");
  }
}

export default new LoginPage();
