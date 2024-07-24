import { useState } from "react";
import { ButtonsBar } from "./components/ButtonsBar";
import { StagingArea } from "./components/StagingArea";
import { loadFile } from "./utils/load";
import { downloadFile } from "./utils/download";
import { play } from "./utils/play";

function App() {
  const [composition, setComposition] = useState([
    { tone: "C", position: 1, duration: 1 },
    { tone: "D", position: 10, duration: 0.5 },
  ]);
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
    console.log(note, composition);
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
      <StagingArea
        composition={composition}
        addNote={addNote}
        deleteNote={deleteNote}
      />
    </>
  );
}

export default App;
