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

export function loadFile() {
  return new Promise((resolve, reject) => {
    requestSelection().then(loadFileFromMetadata).then(resolve);
  });
}
