function requestSelection() {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      let file = e.target.files[0];
      resolve(file);
    };
    input.click();
  });
}

function loadFileFromMetadata(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (readerEvent) => {
      let content = readerEvent.target.result;
      resolve(content);
    };
  });
}

function loadFile() {
  return new Promise((resolve, reject) => {
    requestSelection().then(loadFileFromMetadata).then(resolve);
  });
}

function downloadFile(contents, filename) {
  const anchor = document.createElement("a");
  const file = new Blob([contents], { type: "text/plan" });
  anchor.download = filename;
  anchor.href = URL.createObjectURL(file);
  anchor.click();
}

function ButtonsBar(props) {
  return (
    <>
      <button
        onClick={() =>
          downloadFile(JSON.stringify(props.toSave), "composition.json")
        }
      >
        Save
      </button>
      <button onClick={() => loadFile().then(JSON.parse).then(props.onLoad)}>
        Load
      </button>
    </>
  );
}

export { ButtonsBar };
