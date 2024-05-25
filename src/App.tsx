import React, { useEffect, useState } from "react";
import "./App.css";
import { data as mockData } from "./config/data";
import { STORAGE_DATA_KEY } from "./config/constants";
import { TableHeaders } from "./types/types";

import { TitleMain } from "./components/TitleMain";
import { Table } from "./components/Table";
import { CreateTableButton } from "./components/CreateTableButton";
import { BG1 } from "./components/BG1";
import { TablesList } from "./components/TablesList";

function App() {
  const loadAllTablesData = (): TableHeaders[] => {
    const allKeys = Object.keys(localStorage).filter((key: string) =>
      key.includes(STORAGE_DATA_KEY),
    );
    const allTablesHeaders: TableHeaders[] = allKeys.map((key) => {
      return JSON.parse(localStorage.getItem(key) || "").headers;
    });

    return allTablesHeaders;
  };

  const [allTables, setAllTables] = useState<TableHeaders[]>([]);
  const [openedTableKey, setOpenedTableKey] = useState<string | null>(null);

  const onOpenTable = (tableKey: string) => {
    setOpenedTableKey(tableKey);
  };
  const onCloseTable = () => setOpenedTableKey(null);
  const onCreateNewTable = () => {
    const newTableKey = STORAGE_DATA_KEY + `-${window.crypto.randomUUID()}`;
    const headers: TableHeaders = {
      id: window.crypto.randomUUID(),
      key: newTableKey,
      name: `NEW_TABLE_${allTables.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      openedAt: new Date(),
    };
    localStorage.setItem(
      newTableKey,
      JSON.stringify({
        headers,
        data: Array.from(Object.entries(mockData.data)),
      }),
    );
    setAllTables([headers, ...allTables]);
    onOpenTable(newTableKey);
  };

  useEffect(() => {
    console.log("App mounted");
    setAllTables(loadAllTablesData());
    //return () => onSaveTable();
  }, []);

  useEffect(() => {
    setAllTables(loadAllTablesData());
  }, [openedTableKey]);

  return (
    <div className="App">
      <BG1 />
      <TitleMain />

      <CreateTableButton onCreateNewTable={onCreateNewTable} />

      <TablesList tables={allTables} onTableClick={onOpenTable} />

      {openedTableKey && (
        <Table tableKey={openedTableKey} onCloseTable={onCloseTable} />
      )}
    </div>
  );
}

export default App;
