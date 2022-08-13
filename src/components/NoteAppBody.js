import React from "react";
import { getInitialData } from "../utils";
import NoteInput from "./NoteInput";
import NotesList from "./NoteList";
import EmptyMessage from "./EmptyMessage";

class NoteAppBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
    };

    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onDeleteEventHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveEventHandler(id) {
    // const updateNote = this.state.notes.filter((note) => note.id === id).map((note) => (note.archived = !note.archived));
    const updateNote = this.state.notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
    this.setState({ updateNote });
    console.log(updateNote);
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

  render() {
    const activeNotes = this.state.notes.filter((note) => {
      return note.archived === false;
    });
    const archivedNotes = this.state.notes.filter((note) => {
      return note.archived === true;
    });
    return (
      <div className="note-app__body">
        <NoteInput addNote={this.onAddNoteHandler} />
        <h2>Catatan Aktif</h2>
        {/* {this.state.notes.length > 0 ? <NotesList notes={this.state.notes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} /> : <EmptyMessage />} */}
        <NotesList notes={activeNotes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} />
        <h2>Arsip</h2>
        {/* {this.state.notes.length > 0 ? <NotesList notes={this.state.notes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} /> : <EmptyMessage />} */}
        <NotesList notes={archivedNotes} onDelete={this.onDeleteEventHandler} onArchive={this.onArchiveEventHandler} />
      </div>
    );
  }
}

export default NoteAppBody;
