import { useState, useRef, useEffect } from "react";
import { ButtonsBar } from "./components/ButtonsBar";
import { StagingArea } from "./components/StagingArea";
import { loadFile } from "./utils/load";
import { downloadFile } from "./utils/download";
import { play, defaultBpm, startMetronome } from "./utils/play";


function App() {
  const [composition, setComposition] = useState([[]]);
  const [bpm, setBpm] = useState(defaultBpm);
  const [volume, setVolume] = useState(100);
  const [isMetronome, setIsMetronome] = useState(false);
  const controls = useRef({ commands: null });
  const controlsM = useRef({ commands: null });

  function playComposition() {
    if (controls.commands) {
      controls.commands.stopPlaying();
    }
    controls.commands = play(composition, bpm, volume);
  }

  function playMetronome() {
    if (isMetronome) {
        controlsM.commands.stopMetronome();
    } else {
        controlsM.commands = startMetronome(bpm, volume);
    }
    setIsMetronome(!isMetronome);
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
  useEffect(() => {
    if (controls.commands) {
      controls.commands.setVolume(volume);
    }
    if (controlsM.commands) {
      controlsM.commands.setVolume(volume);
      controlsM.commands.setBPM(bpm);
    }
  }, [volume, bpm]);
  return (
    <>
      <ButtonsBar
        download={downloadComposition}
        load={loadComposition}
        play={playComposition}
        addTrack={addTrack}
      />
      <input
        type="number"
        value={bpm}
        min="0"
        max="350"  
        step="1"
        onChange={(e) => {
          if (e.target.value<=350) {
            setBpm(e.target.value)
          } else {
            e.target.value=350
          }
        }}
        onKeyDown={(e) => {
          if (e.key === '-' || e.key === '.' || e.key === 'e') {
            e.preventDefault();
          }
        }}
      />
      <input
        type="range"
	      min="0"
	      max="100"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
      <input
        type="button"
        onClick={playMetronome}
        value={isMetronome ? 'Stop Metronome' : 'Start Metronome'}
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
