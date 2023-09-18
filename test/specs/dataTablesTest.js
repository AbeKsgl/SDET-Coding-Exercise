import chai from "chai";
import DataTables from "../pageobjects/dataTables.page.js";

const expect = chai.expect;

describe("Data Table", () => {
  /**
   * Clicks on element and checks the  URLs.
   * @param {Array} element
   * @param {string} expectedUrl
   * @example await testLinks(editArray, editUrl)
   */
  async function testLinks(element, expectedUrl) {
    for (const locator of element) {
      // Click the link
      await locator.click();

      // Get the current URL
      const url = await browser.getUrl();

      // Assert that the URL is updated as expected
      expect(
        url,
        `when clicking on edit/delete link, URL should be updated`
      ).to.equal(expectedUrl);
    }
  }

  // before each test...
  beforeEach(async () => {
    await DataTables.open();
  });

  //
  // Tests...
  //
  it("should land on correct page", async () => {
    // Define test data
    const expectedPageHeader = "Data Tables";
    const expectedTableHeader = "Example 1";
    const url = "https://the-internet.herokuapp.com/tables";

    // Get page elements and information for validation.
    const currentUrl = await browser.getUrl();
    const pageHeader = await DataTables.readPageHeader();
    const tableHeader = await DataTables.readTableHeader();

    // Assertions
    expect(currentUrl, "URL should be correct").to.equal(url);
    expect(pageHeader, "Page header should be correct").to.equal(
      expectedPageHeader
    );
    expect(tableHeader, "Table header should be correct").to.equal(
      expectedTableHeader
    );
  });

  it("should verify DataTable Column Headers", async () => {
    // Define test data
    const accountHolder = await DataTables.row;
    const columnHeader = await DataTables.columnHeader;
    const expectedColumnHeader = [
      "Last Name",
      "First Name",
      "Email",
      "Due",
      "Web Site",
      "Actions",
    ];

    // Assertions
    await expect(columnHeader, "should have 6 columns").to.have.lengthOf(6);
    await columnHeader.forEach(async (element, index) => {
      const columnText = await element.getText();
      await expect(
        columnText,
        `Column header at index ${index} should match the expected value`
      ).to.equal(expectedColumnHeader[index]);
    });
    await expect(
      accountHolder,
      "should have 4 account holder"
    ).to.have.lengthOf(4);
  });

  // Last Name
  it("should validate ascending order for Last Name", async () => {
    // Define test data
    const sortedLastNames = (await DataTables.readColumn(1)).sort();
    const lastNameLocator = await DataTables.columnHeader[0];

    // Dispatch click
    await lastNameLocator.click();
    const lastNames = await DataTables.readColumn(1);

    await expect(
      lastNames,
      "should sort last name column ascending order"
    ).to.deep.equal(sortedLastNames);
  });

  // Last Name
  it("should validate descending order for Last Name", async () => {
    // Define test data
    const defaultLastNames = await DataTables.readColumn(1);
    const sortedLastNames = [...defaultLastNames].sort((a, b) => {
      return b.localeCompare(a);
    });

    const lastNameLocator = await DataTables.columnHeader[0];

    // Dispatch double click
    await lastNameLocator.doubleClick();
    const lastNames = await DataTables.readColumn(1);

    // Assertions
    await expect(
      lastNames,
      "should sort last name column descending order"
    ).to.deep.equal(sortedLastNames);
  });

  // First Name
  it("should validate ascending order for First Name", async () => {
    // Define test data
    const sortedFirstNames = (await DataTables.readColumn(2)).sort();
    const firstNameLocator = await DataTables.columnHeader[1];

    // Dispatch click
    await firstNameLocator.click();
    const firstNames = await DataTables.readColumn(2);

    await expect(
      firstNames,
      "should sort first name column ascending order"
    ).to.deep.equal(sortedFirstNames);
  });

  // First Name
  it("should validate descending order for First Name", async () => {
    // Define test data
    const defaultFirstNames = await DataTables.readColumn(2);
    const sortedFirstnames = [...defaultFirstNames].sort((a, b) => {
      return b.localeCompare(a);
    });

    const firstNameLocator = await DataTables.columnHeader[1];

    // Dispatch double click
    await firstNameLocator.doubleClick();
    const firstNames = await DataTables.readColumn(2);

    // Assertions
    await expect(
      firstNames,
      "should sort first name column descending order"
    ).to.deep.equal(sortedFirstnames);
  });

  // Emails
  it("should validate ascending order for Email column", async () => {
    // Define test data
    const sortedEmails = (await DataTables.readColumn(3)).sort();
    const emailLocator = await DataTables.columnHeader[2];

    // Dispatch click
    await emailLocator.click();
    const emails = await DataTables.readColumn(3);

    await expect(
      emails,
      "should sort email column ascending order"
    ).to.deep.equal(sortedEmails);
  });

  // Emails
  it("should validate descending order for Email column", async () => {
    // Define test data
    const defaultEmails = await DataTables.readColumn(3);
    const sortedEmails = [...defaultEmails].sort((a, b) => {
      return b.localeCompare(a);
    });

    const emailLocator = await DataTables.columnHeader[2];

    // Dispatch double click
    await emailLocator.doubleClick();
    const emails = await DataTables.readColumn(3);

    // Assertions
    await expect(
      emails,
      "should sort email column descending order"
    ).to.deep.equal(sortedEmails);
  });

  // Due
  it("should validate ascending order for Due column", async () => {
    // Define test data
    const sortedDues = await DataTables.sortValues(4, false);
    const dueLocator = await DataTables.columnHeader[3];

    // Dispatch click
    await dueLocator.click();
    const dues = await DataTables.readColumn(4);

    await expect(dues, "should sort due column ascending order").to.deep.equal(
      sortedDues
    );
  });

  // Due
  it("should validate descending order for Due column", async () => {
    // Define test data
    const sortedDues = await DataTables.sortValues(4, true);
    const dueLocator = await DataTables.columnHeader[3];

    // Dispatch double click
    await dueLocator.doubleClick();
    const dues = await DataTables.readColumn(4);

    // Assertions
    await expect(dues, "should sort due column descending order").to.deep.equal(
      sortedDues
    );
  });

  // Web Site
  it("should validate ascending order for Web Site column", async () => {
    // Define test data
    const sortedWebsites = (await DataTables.readColumn(5)).sort();
    const websiteLocator = await DataTables.columnHeader[4];
  
    // Dispatch click
    await websiteLocator.click();
    const websites = await DataTables.readColumn(5);

    await expect(
      websites,
      "should sort Web Sites column ascending order"
    ).to.deep.equal(sortedWebsites);
  });

  // Web Sites
  it("should validate descending order for Web Sites column", async () => {
    // Define test data
    const defaultWebsites = await DataTables.readColumn(5);
    const sortedWebsites = [...defaultWebsites].sort((a, b) => {
      return b.localeCompare(a);
    });

    const websiteLocator = await DataTables.columnHeader[4];

    // Dispatch double click
    await websiteLocator.doubleClick();
    const websites = await DataTables.readColumn(5);

    // Assertions
    await expect(
      websites,
      "should sort Web Sites column descending order"
    ).to.deep.equal(sortedWebsites);
  });

  // edit links
  it("should dispatch click action on edit/delete links", async () => {
    const editUrl = "https://the-internet.herokuapp.com/tables#edit";
    const editArray = await DataTables.editLinks;

    await testLinks(editArray, editUrl);
  });

  // delete links
  it("should dispatch click action on delete links", async () => {
    const deleteUrl = "https://the-internet.herokuapp.com/tables#delete";
    const deleteArray = await DataTables.deleteLinks;

    await testLinks(deleteArray, deleteUrl);
  });
});
