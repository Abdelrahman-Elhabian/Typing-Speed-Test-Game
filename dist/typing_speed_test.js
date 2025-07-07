const words = [
  "Hello",
  "Frontend",
  "Course",
  "Code",
  "Programming",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let options = document.querySelectorAll("input[type='radio']");
options.forEach((el) => {
  el.onclick = function () {
    for (let i = 0; i < 3; i++) {
      options[i].classList.remove("selected");
    }
    el.classList.add("selected");
  };
});

let timeLeftSpan = document.querySelector(".time span");
document.querySelector(".start-page button").onclick = function () {
  document.querySelector(".start-page button").style.display = "none";
  document.querySelector(".start-page .choose").style.display = "none";

  let co = document.createElement("h1");
  document.querySelector(".start-page").appendChild(co);
  co.innerHTML = 3;

  let countdown = setInterval(() => {
    co.innerHTML--;
    if (co.innerHTML === "0") {
      clearInterval(countdown);
      document.querySelector(".start-page").style.display = "none";
      startGame(); // Start the game after countdown
    }
  }, 1000);
  setTimeout(() => {
    input.focus();
    genWords();
  }, 3000);
  let checkedValue = document.querySelector(".selected");
  let lvlNameSpan = document.querySelector(".message .lvl");
  let secondsSpan = document.querySelector(".message .seconds");
  lvlNameSpan.innerHTML = checkedValue.value;
  secondsSpan.innerHTML = lvls[checkedValue.value];
  timeLeftSpan.innerHTML = lvls[checkedValue.value];
  n = timeLeftSpan.innerHTML;
};

let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = n;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        again();
      }
    }
  }, 1000);
}

function again() {
  let score = document.createElement("p");
  let t = document.createTextNode(`You Got ${scoreGot.innerHTML}`);
  score.appendChild(t);
  score.style.cssText =
    "color: #1f1e20; font-weight: bold; position: absolute; left: 50%; top: 19%; transform: translate(-50%); font-size: 20px; padding: 2px 5px; background-color: white; border-radius: 6px; border: 1px solid black;";
  document.querySelector(".start-page").style.display = "block";
  document.querySelector(".start-page").appendChild(score);

  let playAgain = document.createElement("h2");
  let over = document.createTextNode("Game Over");
  playAgain.appendChild(over);
  playAgain.style.cssText =
    "color: #de1a1a; position: absolute; left: 50%; top: 34%; transform: translate(-50%); font-size: 60px; -webkit-text-stroke: 1px #ccc;";
  document.querySelector(".start-page").style.display = "block";
  document.querySelector(".start-page").appendChild(playAgain);

  let again = document.createElement("h3");
  let text = document.createTextNode(`Press "Enter" to Play Again`);
  again.appendChild(text);
  again.classList.add("move");
  again.style.cssText =
    "cursor: pointer; color: black; position: absolute; left: 29%; top: 55%; transform: translateX(-50%); font-size: 40px; border: 1px solid black; background-color: white; padding: 5px 10px; border-radius: 6px; box-shadow: 3px 3px 3px 0px black;";
  document.querySelector(".start-page").style.display = "block";
  document.querySelector(".start-page").appendChild(again);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (again && again.offsetParent !== null) {
        again.click(); // Trigger click
      }
    }
  });

  again.onclick = function () {
    location.reload();
  };
  document.querySelector("h1").style.display = "none";
}
