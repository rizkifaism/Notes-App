import React from "react";
import { getInitialData } from "../utils";
import NoteSearch from "./NoteSearch";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      search: "",
    };

    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteEventHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveEventHandler(id) {
    const updateNote = this.state.notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
    this.setState({ notes: updateNote });
  }

  onAddNoteHandler({ title, body }) {
    const currentDate = new Date().toISOString();
    this.setState((prevNote) => {
      return {
        notes: [
          ...prevNote.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: currentDate,
            archived: false,
          },
        ],
      };
    });
  }

  onSearchHandler(event) {
    this.setState(() => {
      return {
        search: event.target.value,
      };
    });
  }

  render() {
    const search = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.search.toLowerCase()));
    const active = search.filter((note) => {
      return note.archived === false;
    });
    const archive = search.filter((note) => {
      return note.archived === true;
    });
    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch onSearch={this.onSearchHandler} />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <NoteList notes={active} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} />
          <h2>Arsip</h2>
          <NoteList notes={archive} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} />
        </div>
      </>
    );
  }
}

export default NoteApp;
