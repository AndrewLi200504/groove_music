function NoteAdder(props) {
  const notes = props.notes; // ["C4", "C#4", "D4", ...]
  const addNote = props.addNote; // addNote(note) should add note to staging area

  return (
    <ul>
      {notes.map((note) => (
        <li key={note} className="inline-block mx-2 my-2">
          <button
            onClick={() => addNote(note)}
            className="bg-transparent hover:bg-blue-500 hover:text-white text-blue-500 border border-blue-500 py-2 px-2 rounded inline-block"
          >
            {note}
          </button>
        </li>
      ))}
    </ul>
  );
}

export { NoteAdder };
