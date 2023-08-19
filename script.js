const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const ranges = document.querySelectorAll(".settings input");
const copyBtn = document.getElementById("copy-btn");

//Event Listeners on Range

ranges.forEach((slider) => {
  slider.addEventListener("input", generateStyles);
});

function generateStyles() {
  const xShadow = document.getElementById("x-shadow").value;
  const yShadow = document.getElementById("y-shadow").value;
  const blurRadius = document.getElementById("blur-r").value;
  const spreadRadius = document.getElementById("spread-r").value;
  const borderRadius = document.getElementById("border-r").value;
  const shadowOpacity = document.getElementById("shadow-op").value;
  const shadowColor = document.getElementById("shadow-color").value;
  const insetShadow = document.getElementById("inset-shadow").checked;

  const boxShodow = `${
    insetShadow ? "inset " : ""
  } ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowOpacity
  )}`;

  preview.style.boxShadow = boxShodow;
  preview.style.borderRadius = `${borderRadius}px`;

  styles.textContent = `box-shadow : ${boxShodow};\nborder-radius : ${borderRadius}px;`;
}

function hexToRgba(shadowColor, shadowOpacity) {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${shadowOpacity})`;
}

document.getElementById("copy-btn").addEventListener("click", copyToClipboard);

function copyToClipboard() {
  var range = document.createRange();
  range.selectNode(document.getElementById("styles"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

generateStyles();
