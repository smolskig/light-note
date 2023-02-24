import { useEffect, useRef, useState } from "react";
import { placeCaretAtEnd } from "../../../utils";
import { Row } from "../row/index";

export const Page = () => {
  const [rows, setRows] = useState([{ content: "" }]);
  const [action, setAction] = useState("");

  const pageRef = useRef(null);

  const handleKeyDown = () => {};

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

      pageRef.current.children[index - 1].focus();
      placeCaretAtEnd(pageRef.current.children[index - 1]);
      setRows(newRows);
    }
  };

  const handleNextRowFocus = () => {
    const index = getFocusedRowIndex() + 1;
    pageRef.current.children[index].focus();
    placeCaretAtEnd(pageRef.current.children[index]);
  };

  useEffect(() => {
    if (action) {
      if (action === "addRow") {
        handleNextRowFocus();
      }
    }
  }, [rows]);

  return (
    <div ref={pageRef} onKeyDown={handleKeyDown}>
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
