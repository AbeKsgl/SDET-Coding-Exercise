import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class SecurePage
 */
class SecurePage extends Page {
  /**
   * success message selector
   */
  get flashAlert() {
    return $("#flash");
  }

  /**
   * welcome message selector
   */
  get welcomeMessage() {
    return $("h4.subheader");
  }

  /**
   * logout button selector
   */
  get btnLogout() {
    return $(".button");
  }

  /**
   * Gets the login success message
   * @returns {string}
   * @example await readFlashAlert()
   */
  async readFlashAlert() {
    return (await this.flashAlert.getText()).split("\n")[0];
  }

  /**
   * Gets the Welcome message
   * @returns {string}
   * @example await readWelcomeMessage()
   */
  async readWelcomeMessage() {
    return (await this.welcomeMessage.getText()).split("\n")[0];
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
   * Clicks on logout button
   */
  async goBtnLogout() {
    await this.btnLogout.click();
  }
}

export default new SecurePage();
