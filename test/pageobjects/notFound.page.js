import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class NotFoundPage
 */

class NotFoundPage extends Page {
  /**
   * user`s profile message selector
   */
  get pageHeader() {
    return $("h1");
  }

  /**
   * Gets the page  header text
   * @returns {string}
   * @example await readPageHeader()
   */
  async readPageHeader() {
    return await this.pageHeader.getText();
  }

  /**
   * Gets the user profile url
   * @returns {string}
   * @example await userProfileUrl()
   */
  async userProfileUrl() {
    return await browser.getUrl();
  }
}

export default new NotFoundPage();
