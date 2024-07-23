const TEMPO_WIDTH = 40;

function TrackNote({ note }) {
  return (
    <div
      className="inline-block box-border float-left border-2 border-black bg-green-500 text-center h-10"
      style={{ width: TEMPO_WIDTH }}
    >
      {note}
    </div>
  );
}

function TrackManager(props) {
  const composition = props.composition; // Array of notes in track.
  const deleteNote = props.deleteNote; // Call with note to delete it.
  return (
    <div className="overflow-x-auto">
      <ul className="h-10" style={{ width: TEMPO_WIDTH * composition.length }}>
        {composition.map((element, index) => (
          <li key={index} onClick={() => deleteNote(element)}>
            <TrackNote note={element} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { TrackManager };
