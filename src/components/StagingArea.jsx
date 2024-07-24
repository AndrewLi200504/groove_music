import React from "react";
import { TrackManager } from "./TrackManager";

function StagingArea({ composition, addNote, deleteNote }) {
  return composition.map((track, index) => (
    <TrackManager
      key={index}
      composition={track}
      addNote={(note) => addNote(index, note)}
      deleteNote={(note) => deleteNote(index, note)}
    />
  ));
}

export { StagingArea };
