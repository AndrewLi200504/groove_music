function NoteAdder(props) {
  const notes = props.notes; // ["C4", "C#4", "D4", ...]
  const addNote = props.addNote; // addNote(note) should add note to staging area

  return (
    <ul>
      {notes.map((note) => (
        <li className="note-adder__li" key={note}>
          <button onClick={() => addNote(note)}>{note}</button>
        </li>
      ))}
    </ul>
  );
}

export { NoteAdder };
