import React, { memo } from "react";

export const InfoCell = memo(function ({ info }: { info?: string }) {
  return <div className="cell-info text-center">{info || "#"}</div>;
});
