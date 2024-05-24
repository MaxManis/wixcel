import { ICell, TextAlignmentEnum, TextStyleEnum } from "../types/types";

export const cellsPlusRes = (
  newVal: string,
  data: Map<string, ICell>
): string => {
  return String(
    parseInt(data.get(newVal.slice(0, 2))?.text || "") +
      parseInt(data.get(newVal.slice(-2))?.text || "")
  );
};

export const cellsMinusRes = (
  newVal: string,
  data: Map<string, ICell>
): string => {
  return String(
    parseInt(data.get(newVal.slice(0, 2))?.text || "") -
      parseInt(data.get(newVal.slice(-2))?.text || "")
  );
};

export const createNewCell = (
  text?: string,
  alignment?: TextAlignmentEnum,
  style?: TextStyleEnum
): ICell => {
  return {
    id: window.crypto.randomUUID(),
    text: text || "",
    alignment: alignment || TextAlignmentEnum.LEFT,
    textStyle: style || TextStyleEnum.NORMAL,
  };
};

export const sortCellKeys = (a: string, b: string) => {
  return Number(a.slice(1)) - Number(b.slice(1)) || a[0].localeCompare(b[0]);
};
