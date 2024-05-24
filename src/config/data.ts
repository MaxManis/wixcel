import { ICell, TextAlignmentEnum, TextStyleEnum } from "../types/types";

export const data: Record<string, ICell> = {
  A1: {
    id: "1",
    text: "foo",
    alignment: TextAlignmentEnum.LEFT,
    textStyle: TextStyleEnum.NORMAL,
  },
  A2: {
    id: "2",
    text: "bazz",
    alignment: TextAlignmentEnum.LEFT,
    textStyle: TextStyleEnum.ITALIC,
  },
  A3: {
    id: "6",
    text: "test",
    alignment: TextAlignmentEnum.RIGHT,
    textStyle: TextStyleEnum.BOLT,
  },
  B1: {
    id: "3",
    text: "123",
    alignment: TextAlignmentEnum.CENTER,
    textStyle: TextStyleEnum.NORMAL,
  },
  B2: {
    id: "4",
    text: "",
    alignment: TextAlignmentEnum.LEFT,
    textStyle: TextStyleEnum.NORMAL,
  },
  B3: {
    id: "5",
    text: "touch me plsssss",
    alignment: TextAlignmentEnum.LEFT,
    textStyle: TextStyleEnum.UNDERLINE,
  },
};
