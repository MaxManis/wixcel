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
