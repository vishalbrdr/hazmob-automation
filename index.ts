import { Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { jobInput } from "./src/cli/jobInput";
import { CHROME } from "./src/constants";
import { Automation } from "./src/job/main";

(async function () {
  const { USER_DIR, USER_PROFILE } = CHROME;
  if (!USER_DIR || !USER_PROFILE) {
    console.log("Please configure .env file");
    process.exit();
  }

  const options = new chrome.Options();
  // Set the path to your Chrome user profile
  options.addArguments(`--user-data-dir=${USER_DIR}`);
  options.addArguments(`--profile-directory=${USER_PROFILE}`);

  const jobs = await jobInput();

  // Create a WebDriver instance
  let driver: WebDriver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  for (const job of jobs) {
    try {
      await new Automation(driver, job).start();
    } catch (e) {
      console.log(e);
      driver.quit();
    }
  }
})();
