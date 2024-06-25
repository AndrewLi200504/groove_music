function downloadFile(contents, filename) {
  const anchor = document.createElement("a");
  const file = new Blob([contents], { type: "text/plan" });
  anchor.download = filename;
  anchor.href = URL.createObjectURL(file);
  anchor.click();
}
