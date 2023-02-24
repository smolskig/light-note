import { useEffect, useRef, useState } from "react";
import { placeCaretAtEnd } from "../../../utils";
import { Row } from "../row/index";

export const Page = () => {
  const [rows, setRows] = useState([{ content: "" }]);
  const [action, setAction] = useState("");

  const pageRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      const index = getFocusedRowIndex() - 1;
      handleRowFocus(index);
    }

    if (e.key === "ArrowDown") {
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

  const handleNextRowFocus = () => {
    const index = getFocusedRowIndex() + 1;
    handleRowFocus(index);
  };

  const handleRowFocus = (index) => {
    if (pageRef.current.children[index]) {
      pageRef.current.children[index].focus();
      placeCaretAtEnd(pageRef.current.children[index]);
    }
  };
  useEffect(() => {
    if (action) {
      if (action === "addRow") {
        handleNextRowFocus();
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
        ></Row>
      ))}
    </div>
  );
};
