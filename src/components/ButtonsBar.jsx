function ButtonsBar({ download, load, play, addTrack }) {
  return (
    <ul>
      {[
        ["Download", download],
        ["Load", load],
        ["Play", play],
        ["Add track", addTrack],
      ].map(([text, handler], index) => (
        <li
          key={index}
          className="inline-block mx-5 border border-blue-500 py-2 px-2 rounded"
        >
          <button onClick={handler}>{text}</button>
        </li>
      ))}
    </ul>
  );
}

export { ButtonsBar };
