import inquirer from "inquirer";
import { CURRENCY } from "../constants";
import { Job, TCurrency } from "../constants/types";

export const jobInput = async () => {
  const data: Job[] = [];
  const { currency } = await getUserSelectionForCurrency();

  switch (currency) {
    case CURRENCY.DOLLARS: {
      const tileId = await askForTileNumber(CURRENCY.DOLLARS);
      data.push({ tileId, currency });
      break;
    }
    case CURRENCY.GOLD: {
      const tileId = await askForTileNumber(CURRENCY.GOLD);
      data.push({ tileId, currency });
      break;
    }
    case CURRENCY.BOTH: {
      const tileIdDollars = await askForTileNumber(CURRENCY.DOLLARS);
      const tileIdGold = await askForTileNumber(CURRENCY.GOLD);
      data.push({ tileId: tileIdDollars, currency: CURRENCY.DOLLARS });
      data.push({
        tileId: tileIdGold,
        currency: CURRENCY.GOLD,
      });
      break;
    }
    default:
      break;
  }
  return data;
};

const getUserSelectionForCurrency = async () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "currency",
      message: "What would you like to automate?",
      choices: Object.values(CURRENCY),
    },
  ]);
};

export const askForTileNumber = async (currency: TCurrency) => {
  const { tileId } = await inquirer.prompt([
    {
      type: "number",
      name: "tileId",
      message: `Enter tile Id for ${currency}`,
    },
  ]);
  return Number(tileId) || 1;
};
