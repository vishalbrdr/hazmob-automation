import { CURRENCY } from ".";

export type TCurrency = (typeof CURRENCY)[keyof typeof CURRENCY];
export type Job = {
  currency: TCurrency;
  tileId: number;
};
export type TCoordinates = { x: number; y: number };
