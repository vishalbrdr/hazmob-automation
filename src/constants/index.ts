require("dotenv").config();

export const CURRENCY = {
  GOLD: "gold",
  DOLLARS: "dollars",
  BOTH: "both",
} as const;

export const ORIGIN_TILE_IDS = [1, 22, 64] as const;

export const COORDS = {
  ORIGIN: { x: 300, y: 169 },
  ORIGIN_2: { x: 300, y: 200 },
  GOLD_BTN: { x: 150, y: 250 },
  PLAY_NOW_BTN: { x: 550, y: 450 },
  SCROLL_BAR_POS_2: { x: 992, y: 600 },
  SCROLL_BAR_POS_3: { x: 992, y: 700 },
  SUBMIT_BTN: {
    x: 565,
    y: 480,
  },
} as const;

export const TILE = {
  WIDTH: 96,
  HEIGHT: 60,
  GAP: 7,
} as const;

export const CHROME = {
  USER_DIR: "/Users/vishalbiradar/Library/Application Support/Google/Chrome",
  USER_PROFILE: "Default",
};

export const CONSTANTS = {
  TILE_PER_ROW: 7,
  HAZMOB: "https://www.crazygames.com/game/hazmob-fps-online-shooter",
  WINDOW_SIZE: { width: 1070, height: 800 },
} as const;
