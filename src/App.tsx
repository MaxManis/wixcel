import React, { useEffect, useState } from "react";
import "./App.css";
import { ICell, TextAlignmentEnum, TextStyleEnum } from "./types/types";
import { data as mockData } from "./config/data";
import {
  ALPHABET,
  CELL_HEIGHT,
  CELL_WIDTH,
  INFO_CELL_WIDTH,
  STORAGE_DATA_KEY,
} from "./config/constants";
import { createNewCell, sortCellKeys } from "./helpers/functions";
import { ToolBar } from "./components/Toolbar";
import { Cell } from "./components/Cell";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import * as cellSlice from "./store/cell/cellSlice";
import { InfoCell } from "./components/InfoCell";
import { SelectedCellInfo } from "./components/SelectedCellInfo";

function App() {
  const loadTableData = () => localStorage.getItem(STORAGE_DATA_KEY);
  const onLoadTable = () => {
    const loadedData = loadTableData();
    return loadedData
      ? new Map<string, ICell>(JSON.parse(loadedData))
      : new Map<string, ICell>(Object.entries(mockData));
  };

  const onSaveTable = () => {
    localStorage.setItem(
      STORAGE_DATA_KEY,
      JSON.stringify(Array.from(data.entries()))
    );
  };

  const [data, setData] = useState<Map<string, ICell>>(onLoadTable());

  const tableColumnsCount = new Set(
    Array.from(data.keys()).map((key) => key.slice(0, 1))
  ).size;
  const tableWidth = tableColumnsCount * CELL_WIDTH;

  const tableRowsCount = Array.from(data.keys()).filter((key) =>
    key.match(/[A]/)
  ).length;
  const tableHeight = tableRowsCount * CELL_HEIGHT;

  const [maxLetter, setMaxLetter] = useState<string>(
    ALPHABET[tableColumnsCount - 1]
  );
  const [maxNum, setMaxNum] = useState<string>(String(tableRowsCount));

  const dispatch = useAppDispatch();
  const { selectedCellKey } = useAppSelector((state) => state.cell);

  const onAddRow = () => {
    if (Number(maxNum) + 1 > 1000) return;
    const newMaxNum = String(Number(maxNum) + 1);
    setMaxNum(newMaxNum);
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
        createNewCell(cellData?.text, align, cellData?.textStyle)
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
        createNewCell(cellData?.text, cellData?.alignment, style)
      );
      dispatch(cellSlice.countActions());
    };
  };

  useEffect(() => {
    console.log("T mounted");
    setData(onLoadTable());
    return () => onSaveTable();
  }, []);

  return (
    <div className="App">
      <h1>
        wi<span className="green-text">X</span>cel: Your new Google Table
      </h1>
      {true && (
        <div className="table-modal">
          <div className="table-modal-content">
            <div className="toolbar">
              <ToolBar
                onAddColumn={onAddColumn}
                onAddRow={onAddRow}
                onDeleteColumn={onRemoveColumn}
                onDeleteRow={onRemoveRow}
                onSave={onSaveTable}
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
      )}
    </div>
  );
}

export default App;
