import {
  TableDataWithHeaders,
  TextAlignmentEnum,
  TextStyleEnum,
} from "../types/types";

export const data: TableDataWithHeaders = {
  headers: {
    id: "asdf-wer-a",
    name: "newTable",
    key: "newTableKey",
    createdAt: new Date(),
    updatedAt: new Date(),
    openedAt: new Date(),
  },
  data: {
    A1: {
      id: "1",
      text: "Create",
      alignment: TextAlignmentEnum.LEFT,
      textStyle: TextStyleEnum.ITALIC,
    },
    A2: {
      id: "2",
      text: "",
      alignment: TextAlignmentEnum.LEFT,
      textStyle: TextStyleEnum.ITALIC,
    },
    A3: {
      id: "6",
      text: "",
      alignment: TextAlignmentEnum.RIGHT,
      textStyle: TextStyleEnum.BOLT,
    },
    B1: {
      id: "3",
      text: "",
      alignment: TextAlignmentEnum.CENTER,
      textStyle: TextStyleEnum.NORMAL,
    },
    B2: {
      id: "4",
      text: "your content",
      alignment: TextAlignmentEnum.CENTER,
      textStyle: TextStyleEnum.UNDERLINE,
    },
    B3: {
      id: "5",
      text: "",
      alignment: TextAlignmentEnum.LEFT,
      textStyle: TextStyleEnum.UNDERLINE,
    },
    C1: {
      id: "7",
      text: "",
      alignment: TextAlignmentEnum.CENTER,
      textStyle: TextStyleEnum.NORMAL,
    },
    C2: {
      id: "8",
      text: "",
      alignment: TextAlignmentEnum.LEFT,
      textStyle: TextStyleEnum.NORMAL,
    },
    C3: {
      id: "9",
      text: "HERE!",
      alignment: TextAlignmentEnum.RIGHT,
      textStyle: TextStyleEnum.BOLT,
    },
  },
};
