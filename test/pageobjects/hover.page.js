import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class HoverPage
 */
class HoverPage extends Page {
  /**
   *  User Avator selector
   */
  get userAvatar() {
    return $$(".figure img");
  }

  /**
   *  User Name selectors
   */
  get userName() {
    return $$(".figcaption h5");
  }

  /**
   *  View Profile link selectors
   */
  get viewProfile() {
    return $$(".figcaption a");
  }

  /**
   *  Page Header selector
   */
  get pageHeader() {
    return $(".example h3");
  }

  /**
   * Gets the user names
   * @returns {string}
   * @example await readUserName()
   */
  async readUserName(index) {
    await (await this.userAvatar[index]).moveTo();
    return (await this.userName[index].getText()).split(" ")[1];
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
   * Navigates the User profile
   * @example await goUserProfile()
   */
  async goUserProfile(index) {
    await (await this.userAvatar[index]).moveTo();
    await (await this.viewProfile[index]).click();
  }

  /**
   * Navigates to Url
   */
  open() {
    return super.open("hovers");
  }
}

export default new HoverPage();
