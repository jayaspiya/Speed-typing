const keys = document.querySelectorAll("input");
const paragraphDOM = document.querySelector(".paragraph");
const wrapper = document.querySelector(".wrapper");
const score = document.querySelector("#score");
const progressBar = document.querySelector("#progressBar");
const timer = document.querySelector(".timer");
const messageHere = document.querySelector(".messageHere");
let timerStarted = false;
let timerFunction;

const allStatement = [
  "Pack my box with five dozen liquor jugs.",
  "Amazingly few discotheques provide jukeboxes.",
  "JFK got my VHS, PC, and XLR web quiz.",
  "No kidding Lorenzo called off his trip to Mexico City just because they told him the conquistadors were extinct.",
  "Quick fox jumps nightly above wizard.",
  "Jim quickly realized that the beautiful towns are expensive.",
  "Two driven jocks help fax my big quiz.",
  "My girl wove six dozen plaid jackets before she quit.",
  "Grumpy wizards make a toxic brew for the jovial queen.",
  "The five boxing wizards jump quickly.",
  "Woven silk pyjamas exchanged for blue quartz.",
  "A quivering Texas zombie fought republic linked jewelry.",
  "Fickle jinx bog dwarves spy math quiz.",
  "The quick brown fox jumps over the lazy dog.",
  "We promptly judged antique ivory buckles for the next prize.",
  "Back in June we delivered oxygen equipment of the same size.",
  "The wizard quickly jinxed the gnomes before they vapourized.",
  "Public junk dwarves hug my quartz fox.",
  "When zombies arrive, quickly fax judge Pat.",
  "The quick onyx goblins jumps over the lazy dwarf.",
  "All questions asked by watched experts amaze the judge.",
  "Pack my box with five dozen liquor jugs.",
  "Five quacking zephyrs jolts my wax bed.",
  "Foxy diva Jennifer Lopez was not baking my quiche.",
];
let preparedStatement = [];
getStatements();
function getStatements() {
  for (let i = 0; i < 5; i++) {
    preparedStatement.push(allStatement[randNum(allStatement.length)]);
  }
}

let completedStatement = [];
let userStringInput = "";
keys.forEach((key) => {
  key.id = key.value.toUpperCase();
});

function randNum(max = preparedStatement.length) {
  return Math.floor(Math.random() * max);
}

function renderText() {
  let paragraph = randNum();
  while (completedStatement.indexOf(paragraph) != -1) {
    paragraph = randNum();
  }
  completedStatement.push(paragraph);
  const statement = preparedStatement[paragraph];
  paragraphDOM.textContent = "";
  statement.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerHTML = char;
    paragraphDOM.appendChild(charSpan);
  });
  updateResult();
}
// renderText(userLevel);
renderText(3);

function checkUserString() {
  const paragraphStatement = paragraphDOM.textContent.toUpperCase().split("");
  const userInputValue = userStringInput.split("");
  const paragraphSpan = paragraphDOM.querySelectorAll("span");
  userInputValue.forEach((charSpan, index) => {
    if (charSpan === paragraphStatement[index]) {
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
      if (completedStatement.length < preparedStatement.length) {
        userStringInput = "";
        renderText();
      } else {
        updateResult(0);
        clearInterval(timerFunction);
        messageHere.classList.remove("hide");
        messageHere.innerHTML = `<h3>
        Congratulation
      </h3>
      Completed in ${timer.textContent}`;
      }
    } else {
      showError();
    }
  }
}
function updateResult(arrController = 1) {
  total = preparedStatement.length;
  completed = completedStatement.length - arrController;
  percentageCompleted = (completed * 100) / total - 100;
  score.textContent = `${completed}/${total}`;
  progressBar.style.transform = `translateX(${percentageCompleted}%)`;
}

function showError() {
  wrapper.classList.add("showError");
  setTimeout(() => {
    wrapper.classList.remove("showError");
  }, 500);

  // document.body.style.animation = " shake 0.5s 1";
}
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
    if (!timerStarted) {
      renderTimer();
      timerStarted = true;
    }
  }
});

function renderTimer() {
  let startTimer = new Date();
  timerFunction = setInterval(() => {
    timer.textContent = getTimerTime();
  }, 1000);

  function getTimerTime() {
    let time = Math.floor((new Date() - startTimer) / 1000);

    if (time > 59) {
      timeSecond = time % 60;
      timeSecond = makeTwoDigit(timeSecond);
      timeMinute = (time - timeSecond) / 60;
      timeMinute = makeTwoDigit(timeMinute);

      time = `${timeMinute}:${timeSecond}`;
    } else {
      time = makeTwoDigit(time);
      time = `00:${time}`;
    }
    return time;
  }
  function makeTwoDigit(num) {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  }
}
