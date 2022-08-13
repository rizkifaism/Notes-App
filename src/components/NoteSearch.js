import React from "react";

function NoteSearch({ searchTitle, onSearch }) {
  return (
    <div className="note-seacrh">
      <input type="text" placeholder="Cari catatan ..." value={searchTitle} onChange={(event) => onSearch(event)} />
    </div>
  );
}

export default NoteSearch;
