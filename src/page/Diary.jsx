// Diary.js
import React, { useEffect, useRef } from "react";
import { initializeEditor, destroyEditor } from "../../utils/EditorInstance";

const Diary = () => {
  const editorContainer = useRef(null);

  useEffect(() => {
    if (editorContainer.current) {
      initializeEditor(editorContainer.current);
    }

    return () => {
      destroyEditor();
    };
  }, []);

  return (
    <div className="bg-red-500">
      <h1>Diary</h1>
      <div
        className="bg-white"
        ref={editorContainer}
        style={{ border: "1px solid #ccc", minHeight: "300px" }}
      ></div>
    </div>
  );
};

export default Diary;
