import { useState } from "react";
import { ButtonsBar } from "./components/ButtonsBar";
import { StagingArea } from "./components/StagingArea";
import { loadFile } from "./utils/load";
import { downloadFile } from "./utils/download";
import { play } from "./utils/play";

function App() {
  const [composition, setComposition] = useState([[]]);
  function playComposition() {
    play(composition);
  }
  function loadComposition() {
    loadFile().then(JSON.parse).then(setComposition);
  }
  function downloadComposition() {
    downloadFile(JSON.stringify(composition), "composition.json");
  }
  function addNote(trackIndex, note) {
    setComposition((oldComposition) => {
      const newComposition = [...oldComposition];
      const toReplace = [...newComposition[trackIndex]];
      toReplace.push(note);
      toReplace.sort((a, b) => a.duration - b.duration);
      newComposition[trackIndex] = toReplace;
      return newComposition;
    });
  }
  function deleteNote(trackIndex, note) {
    setComposition((oldComposition) => {
      const newComposition = [...oldComposition];
      const toReplace = [...newComposition[trackIndex]];
      toReplace.splice(
        toReplace.findIndex((element) => element === note),
        1
      );
      newComposition[trackIndex] = toReplace;
      return newComposition;
    });
  }
  function addTrack() {
    setComposition((oldComposition) => [...oldComposition, []]);
  }
  return (
    <>
      <ButtonsBar
        download={downloadComposition}
        load={loadComposition}
        play={playComposition}
        addTrack={addTrack}
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
