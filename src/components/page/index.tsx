import { useEffect, useRef, useState } from "react";
import { Row } from "../row/index";

export const Page = () => {
  const [rows, setRows] = useState([{ content: "" }]);
  const [action, setAction] = useState("");

  const pageRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const index = getFocusedRowIndex() - 1;
      handleRowFocus(index);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const index = getFocusedRowIndex() + 1;
      handleRowFocus(index);
    }
  };

  const getFocusedRowIndex = (): number => {
    const active = document.activeElement;
    return Array.prototype.slice.call(pageRef.current.children).indexOf(active);
  };

  const handleAddRow = (newRow: any) => {
    const newRows = [...rows, newRow];
    setAction("addRow");
    setRows(newRows);
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      setAction("");
      const index = getFocusedRowIndex();
      const newRows = structuredClone(rows);

      newRows.splice(index, 1);

      handleRowFocus(index - 1);
      setRows(newRows);
    }
  };

  const handleRowFocus = (index) => {
    if (pageRef.current.children[index]) {
      pageRef.current.children[index].focus();
    }
  };

  const handleChange = (e) => {
    const index = getFocusedRowIndex();
    let newRows = rows;

    newRows[index].content = e;
    setRows(newRows);
  };

  useEffect(() => {
    if (action) {
      if (action === "addRow") {
        const index = getFocusedRowIndex() + 1;
        handleRowFocus(index);
      }
    }
  }, [rows]);

  return (
    <div
      ref={pageRef}
      onKeyDown={handleKeyDown}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      {rows.map((row, index) => (
        <Row
          rowData={row}
          key={index}
          id={index}
          handleAddRow={handleAddRow}
          handleRemoveRow={handleRemoveRow}
          handleChange={handleChange}
        ></Row>
      ))}
    </div>
  );
};
