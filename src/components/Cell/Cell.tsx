import classNames from "classnames";
import React, { memo, useEffect, useState } from "react";
import {
  cellsPlusRes,
  cellsMinusRes,
  createNewCell,
} from "../../helpers/functions";
import * as cellSlice from "../../store/cell/cellSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CellProps,
  ICell,
  TextAlignmentEnum,
  TextStyleEnum,
} from "../../types/types";

export const Cell = memo(function ({ cellKey, data }: CellProps) {
  const [cellDataObj, setCellDataObj] = useState<ICell | undefined>(
    data.get(cellKey)
  );

  const dispatch = useAppDispatch();
  const { selectedCellKey, totalActionsCount } = useAppSelector(
    (state) => state.cell
  );

  const onCellEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value;

    if (newVal.match(/[A-Z][0-9]*[+][A-Z][0-9]*/)) {
      newVal = cellsPlusRes(newVal, data);
    }
    if (newVal.match(/[A-Z][0-9]*[-][A-Z][0-9]*/)) {
      newVal = cellsMinusRes(newVal, data);
    }

    const newCellData: ICell = createNewCell(
      newVal,
      cellDataObj?.alignment,
      cellDataObj?.textStyle
    );
    setCellDataObj(newCellData);
    data.set(cellKey, newCellData);
    dispatch(cellSlice.countActions());
  };

  const onCellClick = () => {
    dispatch(cellSlice.setSelectedCell(cellKey));
  };

  useEffect(() => {
    console.log(cellKey, "mount");
    return () => console.log(cellKey, "unmount");
  }, []);

  useEffect(() => {
    if (selectedCellKey !== cellKey) return;
    setCellDataObj(data.get(cellKey));
  }, [totalActionsCount]);

  if (!cellDataObj) return null;

  return (
    <input
      onClick={onCellClick}
      onChange={onCellEdit}
      value={cellDataObj.text}
      className={classNames("cell", {
        "text-center": cellDataObj.alignment === TextAlignmentEnum.CENTER,
        "text-left": cellDataObj.alignment === TextAlignmentEnum.LEFT,
        "text-right": cellDataObj.alignment === TextAlignmentEnum.RIGHT,
        "text-bolt": cellDataObj.textStyle === TextStyleEnum.BOLT,
        "text-italic": cellDataObj.textStyle === TextStyleEnum.ITALIC,
        "text-underline": cellDataObj.textStyle === TextStyleEnum.UNDERLINE,
      })}
    ></input>
  );
});
