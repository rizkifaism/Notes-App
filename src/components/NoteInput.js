import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const limitChar = 50;
    this.setState(() => {
      return {
        title: event.target.value.slice(0, limitChar),
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">Sisa Karakter: {50 - this.state.title.length}</p>
          <input type="text" className="note-input__title" placeholder="Ini adalah judul ..." required value={this.state.title} onChange={this.onTitleChangeEventHandler} />
          <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini ..." required value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
