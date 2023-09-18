import chai from "chai";
import HoverPage from "../pageobjects/hover.page.js";
import NotFoundPage from "../pageobjects/notFound.page.js";

const expect = chai.expect;

describe("Hover Page", () => {
  // before each test
  beforeEach(async () => {
    await HoverPage.open();
  });

  //
  // Tests
  //
  it("should display 3 user avatars", async () => {
    // Define test data.
    const expectedPageHeader = "Hovers";
    const url = "https://the-internet.herokuapp.com/hovers";

    // Get page elements and information for validation.
    const userAvatars = await HoverPage.userAvatar;
    const currentUrl = await browser.getUrl();
    const pageHeader = await HoverPage.readPageHeader();

    // Assertions
    expect(currentUrl, "URL should be correct").to.equal(url);
    expect(pageHeader, "Page header should be correct").to.equal(
      expectedPageHeader
    );
    expect(userAvatars, "Should have 3 user avatars").to.have.lengthOf(3);
  });

  describe("User Profile Navigation", () => {
    const expectedPageHeader = "Not Found";

    /**
     * Navigate to a user's profile by hovering over their avatar and clicking the view profile link.
     * @param {number} index - The index of the user (0-based) to navigate to.
     * @param {string} expectedUser - The expected username of the user being navigated to.
     * @param {string} expectedCurrentUrl - The expected URL after navigation to the user's profile.
     * @example await navigateToUserProfile(index,expectedUser,expectedCurrentUrl)
     */
    async function navigateToUserProfile(
      index,
      expectedUser,
      expectedCurrentUrl
    ) {
      // Read the username of the user to navigate to.
      const userName = await HoverPage.readUserName(index);

      // Trigger the navigation to the user's profile.
      await HoverPage.goUserProfile(index);

      // Get page information after navigation for validation.
      const pageHeader = await NotFoundPage.readPageHeader();
      const currentUrl = await NotFoundPage.userProfileUrl();

      // Assertions
      expect(userName, `Should navigate to ${expectedUser}'s profile`).to.equal(
        expectedUser
      );
      expect(pageHeader).to.equal(
        expectedPageHeader,
        "Page header should be correct"
      );
      expect(currentUrl, "User profile URL should be correct").to.equal(
        expectedCurrentUrl
      );
    }

    it("should navigate to first user`s profile", async () => {
      // Call the navigateToUserProfile function for the first user.
      await navigateToUserProfile(
        0,
        "user1",
        "https://the-internet.herokuapp.com/users/1"
      );
    });

    it("should navigate to second user`s profile", async () => {
      // Call the navigateToUserProfile function for the second user.
      await navigateToUserProfile(
        1,
        "user2",
        "https://the-internet.herokuapp.com/users/2"
      );
    });

    it("should navigate to the third user`s profile", async () => {
      // Call the navigateToUserProfile function for the third user.
      await navigateToUserProfile(
        2,
        "user3",
        "https://the-internet.herokuapp.com/users/3"
      );
    });
  });
});
