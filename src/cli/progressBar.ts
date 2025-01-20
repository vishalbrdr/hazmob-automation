import { TCurrency } from "../constants/types";

const cliProgress = require("cli-progress");

export class ProgressBar {
  private progressBar: any;
  private tileId: number;
  private total: number;
  constructor(currency: TCurrency, tileId: number, total: number) {
    this.progressBar = new cliProgress.SingleBar({
      format: `Progress |{bar}| {value}/{total} ${currency} tiles completed`,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });
    this.tileId = tileId;
    this.total = total;
  }

  public start() {
    this.progressBar.start(this.total, this.tileId);
  }
  public update(tileId: number) {
    this.progressBar.update(tileId);
  }
  public stop() {
    this.progressBar.stop();
  }
}
