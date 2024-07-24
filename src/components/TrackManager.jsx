import React, { useState } from "react";

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

function TrackRow({ tone, addNote, deleteNote, notes }) {
  const [lastMouseDown, setLastMouseDown] = useState(null);
  const minWidth =
    (Math.max(notes.map((note) => note.position + note.duration)) + 5) *
    TEMPO_WIDTH;
  function handleMouseDown(event) {
    if (event.button == 0) {
      setLastMouseDown(event.nativeEvent.offsetX / TEMPO_WIDTH);
    }
  }
  function handleMouseUp(event) {
    if (event.button == 0) {
      const end = event.nativeEvent.offsetX / TEMPO_WIDTH;
      const duration = end - lastMouseDown;
      addNote({ tone: tone, position: lastMouseDown, duration: duration });
      setLastMouseDown(null);
    }
  }
  return (
    <div className="flex">
      <div className="w-12 text-center border-2 border-black bg-yellow-500">
        {tone}
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="inline-block relative box-border border-2 border-black bg-white-500 h-10 grow"
        style={{ minWidth: minWidth }}
      >
        {notes.map((note) => (
          <TrackNote key={note} note={note} deleteNote={deleteNote} />
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
