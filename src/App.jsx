import { NoteAdder } from "./components/NoteAdder";

function fakeAddNote(note) {
  console.log(note);
}

function App() {
  return (
    <>
      <NoteAdder notes={["C4", "C#4", "D4"]} addNote={fakeAddNote} />
    </>
  );
}

export default App;
