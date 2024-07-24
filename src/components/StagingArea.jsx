import React from "react";
import { TrackManager } from "./TrackManager";

function StagingArea({ composition, addNote, deleteNote }) {
  return <TrackManager composition={composition} deleteNote={deleteNote} />;
}

export { StagingArea };
