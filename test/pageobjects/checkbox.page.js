import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class Checkbox
 */
class Checkbox extends Page {
  /**
   * Checkbox page header selector
   */
  get header() {
    return $(".example h3");
  }

  /**
   * Checkbox  selector
   */
  get checkbox() {
    return $$("#checkboxes input");
  }

  /**
   * Gets the Checkbox page header
   * @returns {string}
   * @example await readCheckboxHeader()
   */
  async readCheckboxHeader() {
    return await this.header.getText();
  }

  
  /**
   * landing page
   * @example await open()
   */
  open() {
    return super.open("checkboxes");
  }
}

export default new Checkbox();
