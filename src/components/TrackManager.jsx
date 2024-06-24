function TrackManager(props) {
  const composition = props.composition; // Array of notes in track.
  const deleteNote = props.deleteNote; // Call with note to delete it.
  return (
    <ul>
      {composition.map((element, index) => (
        <li key={index} onClick={() => deleteNote(element)}>
          {element}
        </li>
      ))}
    </ul>
  );
}

export { TrackManager };
