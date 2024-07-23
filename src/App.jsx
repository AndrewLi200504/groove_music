import { useState } from "react";
import { NoteAdder } from "./components/NoteAdder";
import { TrackManager } from "./components/TrackManager";
import { ButtonsBar } from "./components/ButtonsBar";
import { StagingArea } from "./components/StagingArea";
import { loadFile } from "./utils/load";
import { downloadFile } from "./utils/download";
import { play } from "./utils/play";

function App() {
  const [composition, setComposition] = useState([]);
  const notes = [
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
      <StagingArea composition={composition} deleteNote={deleteNote} />
      <NoteAdder notes={notes} addNote={addNote} />
    </>
  );
}

export default App;
