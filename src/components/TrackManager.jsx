import React, { useState } from "react";
import { Dropdown } from "./Dropdown";
const TEMPO_WIDTH = 100;

// A single note in a track component
// A TrackNote takes in a position and duration (numerical) and prop

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
// A single row in track component
// A TrackRow takes in a numerical tone, addNote and deleteNote functions, and notes
// It uses the state mouseInfo
// Mouse down determines the position of the note
// Mouse up determines duration
function TrackRow({ tone, addNote, deleteNote, notes }) {
  const [mouseInfo, setMouseInfo] = useState(null);
  const minWidth =
    (Math.max(...notes.map((note) => note.position + note.duration), 0) + 5) *
    TEMPO_WIDTH;
  function handleMouseDown(event) {
    if (event.button == 0) {
      const curTargetRect = event.currentTarget.getBoundingClientRect();
      const mouseX = (event.pageX - curTargetRect.left) / TEMPO_WIDTH;
      setMouseInfo({
        last: mouseX,
        now: mouseX,
      });
    }
  }
  function handleMouseUp(event) {
    if (event.button == 0 && mouseInfo) {
      const curTargetRect = event.currentTarget.getBoundingClientRect();
      const mouseX = (event.pageX - curTargetRect.left) / TEMPO_WIDTH;
      const duration = mouseX - mouseInfo.last;
      if (duration > 0.1) {
        addNote({ tone: tone, position: mouseInfo.last, duration: duration });
      }
      setMouseInfo(null);
    }
  }
  function handleMouseMove(event) {
    if (mouseInfo) {
      const curTargetRect = event.currentTarget.getBoundingClientRect();
      const mouseX = (event.pageX - curTargetRect.left) / TEMPO_WIDTH;
      if (
        notes.some(
          (note) =>
            note.position < mouseX && mouseX < note.position + note.duration
        )
      ) {
        setMouseInfo(null);
      } else {
        setMouseInfo((oldInfo) => ({
          ...oldInfo,
          now: mouseX,
        }));
      }
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
// A TrackManager takes in a composition, an addNote function and a deleteNote function.
// TrackManager is a mapping of tones to TrackRows
function TrackManager({ composition, addNote, deleteNote }) {
  const tones = ["1", "2", "3", "4", "5", "6", "7", "8"]
    .map((el) => [
      "C" + el,
      "C#" + el,
      "D" + el,
      "E\u266D" + el,
      "E" + el,
      "F" + el,
      "F#" + el,
      "G" + el,
      "A\u266D" + el,
      "A" + el,
      "B\u266D" + el,
      "B" + el,
    ])
    .flat();
  return (
    <div className="overflow-x-auto overflow-y-auto box-border h-96 my-3">
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
