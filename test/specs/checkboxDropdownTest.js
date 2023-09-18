import chai from "chai";
import Checkbox from "../pageobjects/checkbox.page.js";
import Dropdown from "../pageobjects/dropdown.page.js";
import { Utility } from "../utils/Utilitiy.js";

const expect = chai.expect;

describe("Checkboxes and Dropdown", () => {
  it("should click checkboxes a random number of times within a specified range", async () => {
    // Define test data
    const expectedPageHeader = "Checkboxes";
    const url = "https://the-internet.herokuapp.com/checkboxes";

    // Generate random click counts for the checkboxes
    const firstRandomNumber = Utility.generateRandomNumber(1, 10);
    const secondRandomNumber = Utility.generateRandomNumber(1, 10);

    // Open the Checkbox page
    await Checkbox.open();

    // Get page information
    const currentUrl = await browser.getUrl();
    const pageHeader = await Checkbox.readCheckboxHeader();
    const checkbox = await Checkbox.checkbox;

    // Click the first checkbox based on random count
    // And it verifies if it is checked or not
    let isFirstChecked = true;
    let firstCheckBox = await Checkbox.checkbox[0];
    for (let i = 0; i < firstRandomNumber; i++) {
      firstCheckBox.click();
      const isSelected = await firstCheckBox.isSelected();
      await expect(isFirstChecked, "checkbox is not triggered").to.equal(
        isSelected
      );
      isFirstChecked = !isFirstChecked;
    }

    // Click the second checkbox based on random count
    // And it verifies if it is checked or not
    let isSecondChecked = false;
    let secondCheckBox = await Checkbox.checkbox[1];
    for (let i = 0; i < secondRandomNumber; i++) {
      secondCheckBox.click();
      const isSelected = await secondCheckBox.isSelected();
      await expect(isSecondChecked, "checkbox is not triggered").to.equal(
        isSelected
      );
      isSecondChecked = !isSecondChecked;
    }

    // Assertions
    await expect(currentUrl, "URL should be correct").to.equal(url);
    await expect(pageHeader, "should have correct page header").to.equal(
      expectedPageHeader
    );
    await expect(checkbox, "Should have 2 checkbox ").to.have.lengthOf(2);
  });

  it("Dropdown List", async () => {
    // Define test data
    const expectedPageHeader = "Dropdown List";
    const url = "https://the-internet.herokuapp.com/dropdown";

    // Open the Checkbox page
    await Dropdown.open();

    // Get page information
    const currentUrl = await browser.getUrl();
    const pageHeader = await Dropdown.readDropdownHeader();
    const options = await Dropdown.getOptionCount();

    // Generate a random index within the range of available options
    const randomIndex = Math.floor(Math.random() * options.length);

    // Clicks the option at the random index
    await options[randomIndex].click();
    const isSelected = await options[randomIndex].isSelected();
    await browser.pause(2000);
    // Assertions
    await expect(currentUrl, "URL should be correct").to.equal(url);
    await expect(pageHeader, "should have correct page header").to.equal(
      expectedPageHeader
    );
    await expect(options, "should have 2 option available").to.have.lengthOf(2);
    await expect(isSelected, "selected option should be selected").to.be.true;
  });
});
