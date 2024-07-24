import React, { useState } from "react";

const TEMPO_WIDTH = 40;

function TrackNote({ position, duration, ...props }) {
  return (
    <div
      className="absolute border-black bg-green-500 h-full"
      style={{
        top: 0,
        left: position * TEMPO_WIDTH,
        width: duration * TEMPO_WIDTH,
      }}
      {...props}
    />
  );
}

function TrackRow({ tone, addNote, deleteNote, notes }) {
  const [mouseInfo, setMouseInfo] = useState(null);
  const minWidth =
    (Math.max(...notes.map((note) => note.position + note.duration), 0) + 5) *
    TEMPO_WIDTH;
  function handleMouseDown(event) {
    if (event.button == 0) {
      setMouseInfo({
        last: event.nativeEvent.offsetX / TEMPO_WIDTH,
        now: event.nativeEvent.offsetX / TEMPO_WIDTH,
      });
    }
  }
  function handleMouseUp(event) {
    const end = event.nativeEvent.offsetX / TEMPO_WIDTH;
    if (event.button == 0 && mouseInfo) {
      const duration = end - mouseInfo.last;
      if (duration > 0.1) {
        addNote({ tone: tone, position: mouseInfo.last, duration: duration });
      }
      setMouseInfo(null);
    }
  }
  function handleMouseMove(event) {
    if (mouseInfo) {
      const mouseX = event.nativeEvent.offsetX / TEMPO_WIDTH;
      setMouseInfo((oldInfo) => ({
        ...oldInfo,
        now: mouseX,
      }));
    }
  }
  function handleMouseLeave() {
    setMouseInfo(null);
  }
  return (
    <div className="flex">
      <div className="w-12 text-center border-2 border-black bg-yellow-500">
        {tone}
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block relative box-border border-2 border-black bg-white-500 h-10 grow"
        style={{ minWidth: minWidth }}
      >
        {mouseInfo && mouseInfo.now > mouseInfo.last && (
          <TrackNote
            position={mouseInfo.last}
            duration={mouseInfo.now - mouseInfo.last}
          />
        )}
        {notes.map((note) => (
          <TrackNote
            key={note.position}
            position={note.position}
            duration={note.duration}
            onClick={() => deleteNote(note)}
          />
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
