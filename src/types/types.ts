export enum TextAlignmentEnum {
  LEFT = "L",
  CENTER = "C",
  RIGHT = "R",
}
export enum TextStyleEnum {
  NORMAL = "N",
  BOLT = "B",
  ITALIC = "I",
  UNDERLINE = "U",
}

export interface ICell {
  id: string;
  text: string;
  alignment: TextAlignmentEnum;
  textStyle: TextStyleEnum;
}
export type CellProps = {
  cellKey: string;
  data: Map<string, ICell>;
};

export type TableData = Record<string, ICell>;
export type TableDataMap = Map<string, ICell>;
export type TableHeaders = {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  openedAt: Date;
};
export type TableDataWithHeaders = {
  data: TableData;
  headers: TableHeaders;
};
