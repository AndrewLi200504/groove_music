function ButtonsBar({ download, load, play }) {
  return (
    <>
      <button onClick={download}>Save</button>
      <button onClick={load}>Load</button>
      <button onClick={play}>Play</button>
    </>
  );
}

export { ButtonsBar };
