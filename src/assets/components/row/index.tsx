import { useRef } from "react";
import { placeCaretAtEnd } from "../../../utils";

export const Row = ({ rowData, handleAddRow, handleRemoveRow }: any) => {
  const rowRef = useRef(null);

  const handleEnterKey = (e: any) => {
    e.preventDefault();
    const element = rowRef.current;

    if (element) {
      if (e.shiftKey) {
        element.innerHTML += `<br>`;
        placeCaretAtEnd(element);
        return false;
      }

      handleAddRow({ content: "" });
    }

    return false;
  };

  const handleBackspaceKey = (e: any) => {
    const element = rowRef.current;

    if (element.innerHTML === `<br>`) {
      handleRemoveRow();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleEnterKey(e);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Backspace") {
      handleBackspaceKey(e);
    }
  };
  return (
    <div
      ref={rowRef}
      style={{
        border: "1px solid black",
        display: "inline-block",
        width: 200,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        padding: 10,
      }}
      contentEditable
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      dangerouslySetInnerHTML={{ __html: `${rowData.content}<br>` }}
    ></div>
  );
};
