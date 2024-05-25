import React, { useEffect, useState } from "react";
import {
  ICell,
  TableDataMap,
  TableHeaders,
  TextAlignmentEnum,
  TextStyleEnum,
} from "../../types/types";
import { data as mockData } from "../../config/data";
import {
  ALPHABET,
  CELL_HEIGHT,
  CELL_WIDTH,
  INFO_CELL_WIDTH,
} from "../../config/constants";
import { createNewCell, sortCellKeys } from "../../helpers/functions";
import { ToolBar } from "../Toolbar";
import { Cell } from "../Cell";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as cellSlice from "../../store/cell/cellSlice";
import { InfoCell } from "../InfoCell";
import { SelectedCellInfo } from "../SelectedCellInfo";

type Props = {
  tableKey: string;
  onCloseTable: () => void;
};

export const Table: React.FC<Props> = ({ onCloseTable, tableKey }) => {
  const onLoadTable = () => {
    const loadedData = localStorage.getItem(tableKey);
    console.log("loading...");
    if (!loadedData) {
      return {
        data: new Map<string, ICell>(Object.entries(mockData.data)),
        headers: mockData.headers,
      };
    }

    return {
      data: new Map<string, ICell>(JSON.parse(loadedData).data),
      headers: JSON.parse(loadedData).headers,
    };
  };

  const [data, _setData] = useState<TableDataMap>(onLoadTable().data);
  const [headers, setHeaders] = useState<TableHeaders>(onLoadTable().headers);

  const onSaveTable = () => {
    console.log("saving");
    localStorage.setItem(
      tableKey,
      JSON.stringify({
        data: Array.from(data.entries()),
        headers: { ...headers, updatedAt: new Date() },
      }),
    );
  };

  const tableColumnsCount = new Set(
    Array.from(data.keys()).map((key) => key.slice(0, 1)),
  ).size;
  const tableWidth = tableColumnsCount * CELL_WIDTH;

  const tableRowsCount = Array.from(data.keys()).filter((key) =>
    key.match(/[A]/),
  ).length;
  const tableHeight = tableRowsCount * CELL_HEIGHT;

  const [maxLetter, setMaxLetter] = useState<string>(
    ALPHABET[tableColumnsCount - 1],
  );
  const [maxNum, setMaxNum] = useState<string>(String(tableRowsCount));

  const dispatch = useAppDispatch();
  const { selectedCellKey } = useAppSelector((state) => state.cell);

  const onAddRow = () => {
    if (Number(maxNum) + 1 > 1000) return;
    console.log("2", maxNum);
    const newMaxNum = String(Number(maxNum) + 1);
    setMaxNum(newMaxNum);
    console.log("2", maxNum);
    for (let i = 0; i < ALPHABET.indexOf(maxLetter) + 1; i++) {
      data.set(`${ALPHABET[i]}${newMaxNum}`, createNewCell());
    }
  };

  const onRemoveRow = () => {
    if (Number(maxNum) - 1 < 1) return;
    const oldMaxNum = maxNum;
    const newMaxNum = String(Number(maxNum) - 1);
    setMaxNum(newMaxNum);
    for (let i = 0; i < ALPHABET.indexOf(maxLetter) + 1; i++) {
      data.delete(`${ALPHABET[i]}${oldMaxNum}`);
    }
  };

  const onAddColumn = () => {
    if (ALPHABET[ALPHABET.indexOf(maxLetter)] === "Z") return;
    const newMaxLetter = ALPHABET[ALPHABET.indexOf(maxLetter) + 1];
    setMaxLetter(newMaxLetter);
    for (let i = 1; i <= Number(maxNum); i++) {
      data.set(`${newMaxLetter}${i}`, createNewCell());
    }
  };

  const onRemoveColumn = () => {
    if (ALPHABET[ALPHABET.indexOf(maxLetter)] === "A") return;
    const oldMaxLetter = maxLetter;
    const newMaxLetter = ALPHABET[ALPHABET.indexOf(maxLetter) - 1];
    setMaxLetter(newMaxLetter);
    for (let i = 1; i <= Number(maxNum); i++) {
      data.delete(`${oldMaxLetter}${i}`);
    }
  };

  const onUnselectCell = () => {
    dispatch(cellSlice.setSelectedCell(null));
    dispatch(cellSlice.countActions());
  };

  const onAlign = (align: TextAlignmentEnum) => {
    return () => {
      if (!selectedCellKey) return;
      const cellData = data.get(selectedCellKey);
      if (cellData?.alignment === align) return;
      data.set(
        selectedCellKey,
        createNewCell(cellData?.text, align, cellData?.textStyle),
      );
      dispatch(cellSlice.countActions());
    };
  };
  const onStyle = (style: TextStyleEnum) => {
    return () => {
      if (!selectedCellKey) return;
      const cellData = data.get(selectedCellKey);
      if (cellData?.textStyle === style) return;
      data.set(
        selectedCellKey,
        createNewCell(cellData?.text, cellData?.alignment, style),
      );
      dispatch(cellSlice.countActions());
    };
  };
  const onDeleteTable = () => {
    localStorage.removeItem(tableKey);
    onCloseTable();
  };

  useEffect(() => {
    console.log("T mounted");
    const tableData = onLoadTable();
    //setData(tableData.data);
    setHeaders(tableData.headers);
    //return () => onSaveTable();
  }, []);

  return (
    <div className="table-modal">
      <div className="table-modal-content">
        <div className="toolbar">
          <ToolBar
            onAddColumn={onAddColumn}
            onAddRow={onAddRow}
            onDeleteColumn={onRemoveColumn}
            onDeleteRow={onRemoveRow}
            onSave={onSaveTable}
            onDelete={onDeleteTable}
            onClose={onCloseTable}
            onUnselect={onUnselectCell}
            onAlignCenter={onAlign(TextAlignmentEnum.CENTER)}
            onAlignLeft={onAlign(TextAlignmentEnum.LEFT)}
            onAlignRight={onAlign(TextAlignmentEnum.RIGHT)}
            onStyleBolt={onStyle(TextStyleEnum.BOLT)}
            onStyleItalic={onStyle(TextStyleEnum.ITALIC)}
            onStyleUnderline={onStyle(TextStyleEnum.UNDERLINE)}
            onStyleNormal={onStyle(TextStyleEnum.NORMAL)}
          />
          <SelectedCellInfo data={data} />
        </div>

        <div className="table-box">
          <div
            style={{
              width: tableWidth + INFO_CELL_WIDTH,
              height: tableHeight + CELL_HEIGHT,
            }}
            className="table"
          >
            <InfoCell />
            {ALPHABET.slice(0, tableColumnsCount).map((columnName) => (
              <div className="cell text-center" key={columnName}>
                {columnName}
              </div>
            ))}
            {Array.from(data.keys())
              .sort(sortCellKeys)
              .map((key, i, keys) => {
                if (i === 0 || keys[i - 1].slice(1) !== key.slice(1)) {
                  return (
                    <>
                      <InfoCell key={key.slice(1)} info={key.slice(1)} />
                      <Cell key={key} cellKey={key} data={data} />
                    </>
                  );
                }
                return <Cell key={key} cellKey={key} data={data} />;
              })}
          </div>
        </div>
        <div className="table-info-block">
          Table size: {tableColumnsCount}x{tableRowsCount}
        </div>
      </div>
    </div>
  );
};
