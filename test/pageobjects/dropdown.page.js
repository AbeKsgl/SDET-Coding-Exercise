import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class Dropdown
 */
class Dropdown extends Page {
  /**
   * Dropdown page header selector
   */
  get header() {
    return $(".example h3");
  }

  /**
   * Dropdown selector
   */
  get dropdown() {
    return $("select#dropdown");
  }

  /**
   * Gets the Dropdown option count
   * @returns {string}
   * @example await getOptionCount()
   */
  async getOptionCount() {
   const enabledOptions = 'option:not([disabled])'
   return (await this.dropdown).$$(enabledOptions)
  }
  /**
   * Gets the Dropdown page header
   * @returns {string}
   * @example await readCheckboxHeader()
   */
  async readDropdownHeader() {
    return await this.header.getText();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("dropdown");
  }
}

export default new Dropdown();
