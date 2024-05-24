import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { ICell } from "../../types/types";

type Props = {
  data: Map<string, ICell>;
};
export const SelectedCellInfo = memo(function ({ data }: Props) {
  const { selectedCellKey, totalActionsCount } = useAppSelector(
    (state) => state.cell
  );
  const [content, setContent] = useState(data.get(selectedCellKey || "")?.text);

  useEffect(() => {
    setContent(data.get(selectedCellKey || "")?.text);
  }, [selectedCellKey, totalActionsCount]);

  return (
    <div style={{ width: "100%" }} className="selected-cell-bar">
      <div className="selected-cell-key">{selectedCellKey || "A-Z"}</div>
      <div className="selected-cell-text">{content}</div>
    </div>
  );
});
