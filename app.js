const keys = document.querySelectorAll("input");
const paragraphDOM = document.querySelector(".paragraph");
const wrapper = document.querySelector(".wrapper");
let userLevel = 0;
let userStringInput = "";
keys.forEach((key) => {
  key.id = key.value.toUpperCase();
});
document.body.addEventListener("keydown", (event) => {
  const keyPressValue = event.which || event.keyCode;
  const keyPress = String.fromCharCode(keyPressValue);
  // console.log(keyPressValue);
  if (keyPressValue == 8) {
    userStringInput = userStringInput.slice(0, -1);
  }
  if (userStringInput.length < paragraphDOM.textContent.length) {
    if (keyPressValue > 64 && keyPressValue < 91) {
      document.getElementById(CSS.escape(keyPress)).focus();
      userStringInput += keyPress;
    }

    if (keyPressValue == 27) {
      //Developer Tool
      console.log(userStringInput);
    }
    if (keyPressValue == 190) {
      userStringInput += ".";
    }
    if (keyPressValue == 188) {
      userStringInput += ",";
    }
    if (keyPressValue == 32) {
      document.getElementById("SPACE").focus();
      userStringInput += " ";
    }
    knowUserPosition();
    checkUserString();
  }
});

function getText() {
  return fetch("./text.json").then((response) => response.json());
}

async function renderText(paragraph) {
  const arr = await getText();
  const quote = arr.text[paragraph];
  paragraphDOM.textContent = "";
  quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerHTML = char;
    paragraphDOM.appendChild(charSpan);
  });
}
// renderText(userLevel);
renderText(3);

function checkUserString() {
  const paragraphQuote = paragraphDOM.textContent.toUpperCase().split("");
  const userInputValue = userStringInput.split("");
  const paragraphSpan = paragraphDOM.querySelectorAll("span");
  userInputValue.forEach((charSpan, index) => {
    if (charSpan === paragraphQuote[index]) {
      paragraphSpan[index].classList.add("correct");
      paragraphSpan[index].classList.remove("incorrect");
    } else {
      paragraphSpan[index].classList.remove("correct");
      paragraphSpan[index].classList.add("incorrect");
    }
  });
}

function knowUserPosition() {
  const paragraphSpan = paragraphDOM.querySelectorAll("span");
  paragraphSpan.forEach((span) => {
    span.className = "";
  });
  const userPosition = userStringInput.length;
  try {
    paragraphSpan[userPosition].classList.add("userPositionIndicate");
  } catch {
    if (userStringInput == paragraphDOM.textContent.toUpperCase()) {
      if (userLevel < 23) {
        userLevel += 1;
        userStringInput = "";
        renderText(userLevel);
      } else {
        console.log("You win");
      }
    } else {
      console.log("resolve the error");
    }
  }
}

// function showError() {
//   const keyboard = document.querySelector(".keyboard");
//   console.log(keyboard);
//   wrapper.classList.add("animation");
// }
// showError();
