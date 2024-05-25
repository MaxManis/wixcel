import React from "react";
import plusIcon from "../../imgs/plus.png";
import "./CreateTableButton.css";

type Props = {
  text?: string;
  onCreateNewTable: () => void;
};

export const CreateTableButton: React.FC<Props> = ({
  onCreateNewTable,
  text,
}) => {
  return (
    <div onClick={onCreateNewTable} className="create_table_button__button">
      <img
        src={plusIcon}
        alt="table"
        className="create_table_button__plus-img"
      />
      <div className="create_table_button__text">
        {text || "Create New Table"}
      </div>
    </div>
  );
};
