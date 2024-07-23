import React from "react";
import { TrackManager } from "./TrackManager";

function StagingArea({ composition, deleteNote }) {
  return <TrackManager composition={composition} deleteNote={deleteNote} />;
}

export { StagingArea };
