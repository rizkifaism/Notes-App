import React from "react";
import { getInitialData } from "../utils";

function ArchiveButton({ id, onArchive }) {
  const data = getInitialData();
  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
      {data.archived ? "Pindahkan" : "Arsipkan"}
    </button>
  );
}

export default ArchiveButton;
