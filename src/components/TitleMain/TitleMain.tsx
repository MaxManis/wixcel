import React from "react";

type Props = {};

export const TitleMain: React.FC<Props> = () => {
  return (
    <h1 style={{ margin: "0px auto 36px", width: "max-content" }}>
      Wi<span className="green-text">X</span>cel: Your local Google Sheets
    </h1>
  );
};
