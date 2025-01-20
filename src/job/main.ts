import * as robot from "robotjs";
import { WebDriver } from "selenium-webdriver";
import { ProgressBar } from "../cli/progressBar";
import { CONSTANTS, COORDS, CURRENCY, TILE } from "../constants";
import { Job, TCoordinates } from "../constants/types";
export class Automation {
  private driver: WebDriver;
  private job: Job;
  private progressBar: ProgressBar;
  constructor(driver: WebDriver, job: Job) {
    this.driver = driver;
    this.job = job;
    this.progressBar = new ProgressBar(job.currency, job.tileId - 1, 100);
  }

  start = async () => {
    await this.driver.manage().window().setRect(CONSTANTS.WINDOW_SIZE);
    await this.driver.get(CONSTANTS.HAZMOB);

    this.progressBar.start();
    for (let tileId = this.job.tileId; tileId <= 100; tileId++) {
      await this.sleep(1);
      await this.click(COORDS.PLAY_NOW_BTN, ""); // play now button
      await this.sleep(20, "waiting for rewards page to load"); // loading time

      if (this.job.currency === CURRENCY.GOLD) {
        await this.click(COORDS.GOLD_BTN, "Gold"); // clicks on gold btn
        await this.click(COORDS.GOLD_BTN, "Gold"); // clicks on gold btn
      }

      const { row, col, scrollCoords, origin } = this.getTilePosition(tileId);
      if (scrollCoords) {
        await this.scroll(scrollCoords);
      }
      const tileCoords = this.getCoords(row, col, origin);
      await this.click(tileCoords, `${this.job.currency} ${tileId}`); // clicks on tile
      await this.sleep(10);
      await this.submit();
      this.progressBar.update(tileId);
      await this.refresh();
    }
  };

  private refresh = async () => {
    await this.driver.navigate().refresh();
  };

  private getTilePosition = (tileId: number) => {
    let row = Math.ceil(tileId / CONSTANTS.TILE_PER_ROW);
    let scrollCoords = null;
    const col = tileId % CONSTANTS.TILE_PER_ROW || CONSTANTS.TILE_PER_ROW;
    let origin: TCoordinates = COORDS.ORIGIN;
    if (tileId >= 42 && tileId < 50) {
      row = row - 4;
      scrollCoords = COORDS.SCROLL_BAR_POS_2;
      origin = COORDS.ORIGIN_2;
    } else if (tileId > 50) {
      row = row - 7;
      scrollCoords = COORDS.SCROLL_BAR_POS_3;
      origin = COORDS.ORIGIN;
    }
    return { row, col, scrollCoords, origin };
  };

  private getCoords = (row: number, col: number, origin: TCoordinates) => {
    const x = origin.x + col * TILE.WIDTH + TILE.GAP - TILE.WIDTH / 2;
    const y = origin.y + row * TILE.HEIGHT + TILE.GAP - TILE.HEIGHT / 2;
    return { x, y };
  };

  private click = (coord: TCoordinates, buttonName?: string) => {
    this.log(
      `Clicked ${buttonName || "" + " button"} @${JSON.stringify(coord)}`
    );
    return this.driver.actions().move(coord).click().perform();
  };

  private submit = async () => {
    await this.click({ x: 550, y: 510 }, "submit 1");
    await this.sleep(1);
    await this.click({ x: 550, y: 430 }, "submit 2");
    await this.sleep(3);
  };

  private sleep(seconds: number, message?: string) {
    this.log(message);
    return this.driver.sleep(seconds * 1000);
  }

  async scroll(co: TCoordinates) {
    robot.moveMouseSmooth(co.x, co.y);
    robot.mouseClick();
    this.log("scrolled");
    await this.sleep(1);
  }

  log(message?: string) {
    if (message) console.log("\n" + message);
  }
}

//   }

//   // Execute the JavaScript
//   //   await driver.sleep(1000000);
// };

// //   for (let index = 1; index < 6; index++) {
// //     c.y = c.y + 55 * index;
// //     for (let i = 0; i < 7; i++) {
// //       await driver
// //         .actions()
// //         .move({ x: c.x + 90 * i, y: c.y })
// //         .click()
// //         .perform(); // ad btn
// //       await driver.actions().move(submitbtn).click().perform();
// //       await driver.actions().move(submitbtn2).click().perform();
// //       await driver.actions().move(submitbtn3).click().perform();
// //       await driver.sleep(3000);
// //       await driver.navigate().refresh();
// //     }
// //   }
// // };

// const getCoords = (row: number, col: number) => {
//   const x = COORDS.ORIGIN.x + col * TILE.WIDTH + TILE.GAP - TILE.WIDTH / 2;
//   const y = COORDS.ORIGIN.y + row * TILE.HEIGHT + TILE.GAP - TILE.HEIGHT / 2;
//   console.log(x, y);
//   return { x, y };
// };

// const clickAt(coords:)
