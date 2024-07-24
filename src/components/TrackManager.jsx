const TEMPO_WIDTH = 40;

function TrackNote({ note }) {
  return (
    <div
      className="absolute border-black bg-green-500 h-full"
      style={{
        top: 0,
        left: note.position * TEMPO_WIDTH,
        width: note.duration * TEMPO_WIDTH,
      }}
    />
  );
}

function TrackRow({ tone, notes }) {
  const minWidth =
    Math.max(notes.map((note) => note.position + note.duration)) * TEMPO_WIDTH;
  return (
    <div className="flex">
      <div className="w-12 text-center border-2 border-black bg-yellow-500">
        {tone}
      </div>
      <div
        className="inline-block relative box-border border-2 border-black bg-white-500 h-10 grow"
        style={{ minWidth: minWidth }}
      >
        {notes.map((note) => (
          <TrackNote note={note} />
        ))}
      </div>
    </div>
  );
}

function TrackManager({ composition, addNote, deleteNote }) {
  const tones = [
    "C",
    "C#",
    "D",
    "E\u266D",
    "F",
    "F#",
    "G",
    "A\u266D",
    "A",
    "B\u266D",
    "B",
  ];
  return (
    <div className="overflow-x-auto">
      <ul>
        {tones.map((tone, index) => (
          <li key={index}>
            <TrackRow
              tone={tone}
              notes={composition.filter((note) => note.tone === tone)}
              addNote={addNote}
              deleteNote={deleteNote}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { TrackManager };
