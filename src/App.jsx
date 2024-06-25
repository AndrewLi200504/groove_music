import { useState } from "react";
import { NoteAdder } from "./components/NoteAdder";
import { TrackManager } from "./components/TrackManager";
import { ButtonsBar } from "./components/ButtonsBar";
import { loadFile } from "./utils/load";
import { downloadFile } from "./utils/download";
import { play } from "./utils/play";

function App() {
  const [composition, setComposition] = useState([]);
  const notes = [
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
  ];
  function playComposition() {
    play(composition);
  }
  function loadComposition() {
    loadFile().then(JSON.parse).then(setComposition);
  }
  function downloadComposition() {
    downloadFile(JSON.stringify(composition), "composition.json");
  }
  function addNote(note) {
    setComposition((oldComposition) => [...oldComposition, note]);
  }
  function deleteNote(note) {
    setComposition((oldComposition) => {
      const newComposition = [...oldComposition];
      newComposition.splice(
        newComposition.findIndex((element) => element === note),
        1
      );
      return newComposition;
    });
  }
  return (
    <>
      <ButtonsBar
        download={downloadComposition}
        load={loadComposition}
        play={playComposition}
      />
      <TrackManager composition={composition} deleteNote={deleteNote} />
      <NoteAdder notes={notes} addNote={addNote} />
    </>
  );
}

export default App;
