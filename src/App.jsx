import { useState } from "react";
import { NoteAdder } from "./components/NoteAdder";
import { TrackManager } from "./components/TrackManager";
import { ButtonsBar } from "./components/ButtonsBar";

function logArguments() {
  for (let argument of arguments) {
    console.log(argument);
  }
}

function App() {
  const [composition, setComposition] = useState({});
  return (
    <>
      <ButtonsBar
        onSave={logArguments}
        onLoad={logArguments}
        onExport={logArguments}
      />
      <TrackManager composition={composition} setComposition={setComposition} />
      <NoteAdder notes={["C4", "C#4", "D4"]} addNote={logArguments} />
    </>
  );
}

export default App;
