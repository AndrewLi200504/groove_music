function TrackManager(props) {
  const composition = props.composition; // Array of notes in track.
  const deleteNote = props.deleteNote; // Call with note to delete it.
  
  return (
    <ul>
      <span>Composition: </span>
      {composition.map((element, index) => (
        <button 
          key={index} 
          onClick={() => deleteNote(element)}
          title="Delete" 
        >
          {element}
        </button>
      ))}
    </ul>
  );
}

export { TrackManager };
