import { memo } from "react";
import { useAppSelector } from "../../store/hooks";
import tablePng from "../../imgs/table.png";

type ToolBarProps = {
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteColumn: () => void;
  onDeleteRow: () => void;

  onSave?: () => void;
  onDelete?: () => void;
  onClose?: () => void;

  onUnselect?: () => void;

  onStyleBolt?: () => void;
  onStyleItalic?: () => void;
  onStyleUnderline?: () => void;
  onStyleNormal?: () => void;
  onAlignLeft?: () => void;
  onAlignRight?: () => void;
  onAlignCenter?: () => void;
};

export const ToolBar = memo(function ({
  onAddColumn,
  onAddRow,
  onDeleteColumn,
  onDeleteRow,
  onSave,
  onDelete,
  onClose,
  onStyleBolt,
  onStyleItalic,
  onStyleUnderline,
  onStyleNormal,
  onAlignLeft,
  onAlignRight,
  onAlignCenter,
  onUnselect,
}: ToolBarProps) {
  const { selectedCellKey } = useAppSelector((state) => state.cell);

  return (
    <div className="btn-toolbar">
      <img src={tablePng} alt="table" className="navbar-table-img" />
      <div className="btn-group">
        <button onClick={onSave} className="btn" data-original-title="Save">
          <i className="icon-file"></i>
        </button>
        <button onClick={onClose} className="btn" data-original-title="Close">
          <i className="icon-remove"></i>
        </button>
        <button
          onClick={onDelete}
          className="btn"
          data-original-title="Delete Table"
        >
          <i className="icon-trash"></i>
        </button>
      </div>

      <div className="btn-group">
        <button
          onClick={onAddColumn}
          className="btn"
          data-original-title="Add New Column"
        >
          <i className="icon-plus"></i>
          <i className="icon-chevron-right"></i>
        </button>
        <button
          onClick={onDeleteColumn}
          className="btn"
          data-original-title="Remove Column"
        >
          <i className="icon-minus"></i>
          <i className="icon-chevron-left"></i>
        </button>
        <button
          onClick={onAddRow}
          className="btn"
          data-original-title="Add New Row"
        >
          <i className="icon-plus"></i>
          <i className="icon-chevron-down"></i>
        </button>
        <button
          onClick={onDeleteRow}
          className="btn"
          data-original-title="Remove Row"
        >
          <i className="icon-minus"></i>
          <i className="icon-chevron-up"></i>
        </button>
      </div>

      <div className="btn-group">
        <button
          disabled={!selectedCellKey}
          onClick={onUnselect}
          className="btn"
          data-original-title="Unselect Cell"
        >
          <i className="icon-eye-close"></i>
        </button>
      </div>

      <div className="btn-group">
        <button
          disabled={!selectedCellKey}
          onClick={onAlignLeft}
          className="btn"
          data-original-title="Align Left"
        >
          <i className="icon-align-left"></i>
        </button>
        <button
          disabled={!selectedCellKey}
          onClick={onAlignCenter}
          className="btn"
          data-original-title="Align Center"
        >
          <i className="icon-align-center"></i>
        </button>
        <button
          disabled={!selectedCellKey}
          onClick={onAlignRight}
          className="btn"
          data-original-title="Align Right"
        >
          <i className="icon-align-right"></i>
        </button>
      </div>

      <div className="btn-group">
        <button
          disabled={!selectedCellKey}
          onClick={onStyleNormal}
          className="btn"
          data-original-title="Normal Text"
        >
          <i className="icon-font"></i>
        </button>
        <button
          disabled={!selectedCellKey}
          onClick={onStyleBolt}
          className="btn"
          data-original-title="Bold"
        >
          <i className="icon-bold"></i>
        </button>
        <button
          disabled={!selectedCellKey}
          onClick={onStyleItalic}
          className="btn"
          data-original-title="Italic"
        >
          <i className="icon-italic"></i>
        </button>
        <button
          disabled={!selectedCellKey}
          onClick={onStyleUnderline}
          className="btn"
          data-original-title="Underline"
        >
          <i className="icon-text-width"></i>
        </button>
      </div>
    </div>
  );
});
