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
        onSave={logArguments}
        onLoad={logArguments}
        onExport={logArguments}
        onPlay={logArguments}
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
        notes={["C4", "C#4", "D4"]}
        addNote={(note) =>
          setComposition((oldComposition) => [...oldComposition, note])
        }
      />
    </>
  );
}

export default App;
