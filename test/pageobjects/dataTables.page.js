import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * @class DataTables
 */
class DataTables extends Page {
  /**
   *  Page Header selector
   */
  get pageHeader() {
    return $(".example h3");
  }

  /**
   *  Table Header selector
   */
  get tableHeader() {
    return $$(".example h4");
  }

  /**
   *  Column Header selector
   */
  get columnHeader() {
    return $$("#table1 th");
  }

  /**
   *  Row selector
   */
  get row() {
    return $$("#table1 tbody tr");
  }

  /**
   * edit links selector
   */
  get editLinks(){
    return $$(`//table[@id='table1'] //a[text()='edit']`)
  }

  /**
   * delete links selector
   */
  get deleteLinks(){
    return $$(`//table[@id='table1'] //a[text()='delete']`)
  }
  /**
   * Selects elements in a specific column by column number
   * @param {number} column
   * @example await DataTables.selectColumn(1);
   */
  async selectColumn(column) {
    return $$(`#table1 tr td:nth-child(${column})`);
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
   * Gets the Table Header text
   * @returns {string}
   * @example await readTableHeader()
   */
  async readTableHeader() {
    return (await this.tableHeader)[0].getText();
  }

  /**
   * Gets column inputs
   * @param {number}
   * @returns {Promise<string[]>} -
   * @example await readColumn(column)
   */
  async readColumn(column) {
    const elements = await this.selectColumn(column);
    const lastNames = await Promise.all(
      elements.map((element) => element.getText())
    );
    return lastNames;
  }
  /**
   * Sorts the Array
   * @param {Array} column
   * @returns {Array} - The sorted array
   * @example await sortValues(values) output: ['$50.00', '$50.00', '$51.00', '$100.00']
   */

  async sortValues(column, descending = false) {
    const values = await this.readColumn(column);
    return values.sort((a, b) => {
      const firstElement = parseFloat(a.replace("$", ""));
      const secondElement = parseFloat(b.replace("$", ""));

      if (descending) {
        return secondElement - firstElement; 
      } else {
        return firstElement - secondElement; 
      }
    });
  }
  /**
   * landing page
   * @example await open()
   */
  open() {
    return super.open("tables");
  }
}

export default new DataTables();
