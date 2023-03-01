import { useRef } from "react";
import { placeCaretAtEnd } from "../../utils";

export const Row = ({
  rowData,
  handleAddRow,
  handleRemoveRow,
  handleChange,
}: any) => {
  const rowRef = useRef(null);

  const handleEnterKey = (e: any) => {
    e.preventDefault();
    const element = rowRef.current;

    if (element) {
      if (e.shiftKey) {
        // element.innerHTML += `<br>`;
        // placeCaretAtEnd(element);
        return false;
      }

      handleAddRow({ content: "" });
    }

    return false;
  };

  const handleBackspaceKey = (e: any) => {
    const element = rowRef.current;
    if (element.innerHTML === "") {
      e.preventDefault();
      handleRemoveRow();
    }
  };

  const handleKeyDown = (e: any) => {
    handleChange(e.target.innerHTML);

    if (e.key === "Enter") {
      handleEnterKey(e);
    }
    if (e.key === "Backspace") {
      handleBackspaceKey(e);
    }
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
  };
  const handleFocus = (e) => {
    placeCaretAtEnd(e.target);
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
      onFocus={handleFocus}
      dangerouslySetInnerHTML={{ __html: `${rowData.content}` }}
    ></div>
  );
};
