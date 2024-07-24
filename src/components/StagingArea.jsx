import React from "react";
import { TrackManager } from "./TrackManager";

function StagingArea({ composition, addNote, deleteNote }) {
  return (
    <TrackManager
      composition={composition}
      addNote={addNote}
      deleteNote={deleteNote}
    />
  );
}

export { StagingArea };
