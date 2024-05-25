import React from "react";
import { TableHeaders } from "../../types/types";
import tablePng from "../../imgs/table-icon.png";

type Props = {
  tables: TableHeaders[];
  onTableClick: (key: string) => void;
};

export const TablesList: React.FC<Props> = ({ tables, onTableClick }) => {
  return (
    <div className="tables-list">
      <div className="tables-list__info-item">
        <div className="tables-list__info-item-group-1">
          <div>#</div>
          <div>Name</div>
        </div>
        <div className="tables-list__info-item-group-2">
          <div>Created at</div>
          <div>Updated at</div>
        </div>
      </div>
      {tables.length > 0 &&
        tables
          .sort(
            (a: TableHeaders, b: TableHeaders) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((headers: TableHeaders) => (
            <div
              key={headers.id}
              onClick={() => onTableClick(headers.key)}
              className="tables-list__item"
            >
              <div className="tables-list__item-group-1">
                <img
                  src={tablePng}
                  alt="table"
                  className="tables-list__table-img"
                />
                <div>{headers.name}</div>
              </div>
              <div className="tables-list__item-group-2">
                <div>{new Date(headers.createdAt || "").toUTCString()}</div>
                <div>{new Date(headers.updatedAt || "").toUTCString()}</div>
              </div>
            </div>
          ))}

      {tables.length === 0 && (
        <div className="tables-list__empty-item">
          <strong>No tables yet...</strong>
        </div>
      )}
    </div>
  );
};
