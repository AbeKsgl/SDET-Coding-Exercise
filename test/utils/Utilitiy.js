export class Utility {
  /**
   * Generate a random number within a specified range.
   * @param {number} min
   * @param {number} max
   * @returns {number} - A random number within the specified range.
   * @example generateRandomNumber(1, 10)
   */
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random password of the specified length.
   * @param {number} length
   * @returns {string}
   * @example generatRandomPassword(12)
   */
  static generateRandomCeredentails(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }
}
