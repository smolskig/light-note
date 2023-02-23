import { useLayoutEffect, useRef, useState } from "react";
import { Row } from "../row";

export const Page = () => {
  const [rows, setRows] = useState([
    {
      selected: true,
      id: 0,
    },
  ]);

  const pageRef = useRef(null);

  const handleAddRow = (row) => {
    const deselectedRows = rows.map((row) => ({ ...row, selected: false }));

    setRows([...deselectedRows, row]);
  };

  const handleRemoveRow = (rowId) => {
    const deselectedRows = rows.map((row) => ({ ...row, selected: false }));
    let idOfPreviousRow: number;

    rows.forEach((row, index) => {
      if (row.id === rowId) {
        idOfPreviousRow = deselectedRows[index - 1].id;
      }
    });

    const filteredRows = deselectedRows
      .filter((item) => item.id !== rowId)
      .map((row) => {
        if (row.id === idOfPreviousRow) {
          row.selected = true;
        }

        return row;
      });

    setRows(filteredRows);
  };

  useLayoutEffect(() => {
    const element = pageRef.current;
    const getSelectedRow = rows.filter((row) => row.selected)[0];
    console.log("selectedRow", getSelectedRow);

    element.children[getSelectedRow.id].focus();
  }, [rows]);

  return (
    <div ref={pageRef}>
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
