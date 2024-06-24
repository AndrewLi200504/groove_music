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
  const [composition, setComposition] = useState([]);
  return (
    <>
      <ButtonsBar
        toSave={composition}
        onLoad={setComposition}
        onExport={logArguments}
      />
      <TrackManager
        composition={composition}
        deleteNote={(note) =>
          setComposition((oldComposition) => {
            const newComposition = [...oldComposition];
            newComposition.splice(
              newComposition.findIndex((element) => element === note),
              1
            );
            return newComposition;
          })
        }
      />
      <NoteAdder
        notes={[
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
        ]}
        addNote={(note) =>
          setComposition((oldComposition) => [...oldComposition, note])
        }
      />
    </>
  );
}

export default App;
