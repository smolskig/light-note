import { useRef } from "react";

export const Row = ({ rowData, id, handleAddRow, handleRemoveRow }: any) => {
  const rowRef = useRef(null);

  const placeCaretAtEnd = (el) => {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  };

  const handleKeyDown = (e: any) => {
    const element = rowRef.current;
    console.log(element);

    e.persist();

    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRow({
        selected: true,
        id: id + 1,
      });

      if (e.shiftKey) {
        element.innerHTML += `<br>`;

        placeCaretAtEnd(element);
      }
      return false;
    }

    if (e.key === "Backspace") {
      if (rowData.id !== 0 && element.innerHTML === `<br>`) {
        handleRemoveRow(rowData.id);
      }
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
      dangerouslySetInnerHTML={{ __html: "<br>" }}
    ></div>
  );
};
