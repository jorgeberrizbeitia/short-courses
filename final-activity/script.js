// MESSAGE COMMUNICATION
const MESSAGE_SOURCE = 'IRON_LESSON_ACTIVITY'

// USER INPUTS

const emojiOneInput = document.querySelector("#emoji-one-input");
const emojiTwoInput = document.querySelector("#emoji-two-input");
const emojiThreeInput = document.querySelector("#emoji-three-input");
const varDeclareInput = document.querySelector("#var-declare-input");
const varAssignInput = document.querySelector("#var-assign-input");

const widthInput = document.querySelector("#style-width-input");
const heightInput = document.querySelector("#style-height-input");
const backgroundColorInput = document.querySelector(
  "#style-background-color-input"
);

const confettiInput = document.querySelector("#confetti-function-input");

const emoji1InputCheck = document.querySelector("#emoji-1-input-check");
const emoji2InputCheck = document.querySelector("#emoji-2-input-check");
const emoji3InputCheck = document.querySelector("#emoji-3-input-check");
const emoji4InputCheck = document.querySelector("#emoji-4-input-check");
const emoji5InputCheck = document.querySelector("#emoji-5-input-check");
const emoji6InputCheck = document.querySelector("#emoji-6-input-check");
const emoji7InputCheck = document.querySelector("#emoji-7-input-check");
const emoji8InputCheck = document.querySelector("#emoji-8-input-check");

const isEmoji = (str) => {
  var ranges = [
    "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
  ];
  if (str.match(ranges.join("|"))) {
    return true;
  } else {
    return false;
  }
};

const isVariable = (str) => {
  const varRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return varRegex.test(str.trim());

};

const usedVariables = [ "circleButtons", "emojiOne", "emojiTwo", "jsConfetti" ];

const isMatching = (inputA, inputB) => {
  return inputA.value.length > 0 && inputA.value.trim() === inputB.value.trim();
};

const successFeedback = [
  'Nice! Very good job!',
  'That\'s correct, well done!',
  'Great work, that\'s the right answer!',
  'Keep up the good work!',
  'Terrific job, well done!',
];

const failFeedback = [
  'Not quite, have another go.',
  'Not quite, try again.',
];

const rotateRandom = (arr) => {
  let pool = arr.slice();
  return () => {
    if (pool.length === 0) pool = arr.slice();
    const randomIndex = Math.floor(Math.random() * (pool.length - 0));
    const returnVal = pool.splice(randomIndex, 1)[0];
    return returnVal;
  };
};

const getSuccessFeedback = rotateRandom(successFeedback);
const getGenericFailFeedback = rotateRandom(failFeedback);

const createInputFeedback = (element) => {
  const triesBeforeSpoiler = 1;
  let triesSoFar = 0;

  return {
    succeed: () => {
      triesSoFar = 0;
      element.innerText = getSuccessFeedback();
      element.style.color = "lightgreen";
    },
    fail: (errorMsg) => {
      triesSoFar += 1;
      element.innerText = triesSoFar > triesBeforeSpoiler
        ? errorMsg
        : getGenericFailFeedback();
      element.style.color = "salmon";
    },
  };
};

const createEmoji3State = () => {
  let declare = false;
  let emoji = false;
  let assign = false;

  return (str, state) => {
    const states = { declare, emoji, assign };
    states[str] = state;
    ({ declare, emoji, assign } = states);

    if (declare && emoji && assign) {
      circleButtons[2].innerText = emojiThreeInput.value;
    } else {
      circleButtons[2].innerText = "";
    }
  };
};

// DOM TO ALTER

const circleButtons = document.querySelectorAll(".circle-btn");
const counters = document.querySelectorAll(".counter");

// ACTIVITY 1

const emoji1Feedback = createInputFeedback(emoji1InputCheck);
emojiOneInput.addEventListener("change", () => {
  let valid = false;
  if (isEmoji(emojiOneInput.value)) {
    valid = true;
    circleButtons[0].innerText = emojiOneInput.value;
    emoji1Feedback.succeed();
  } else {
    valid = false;
    circleButtons[0].innerText = "";
    emoji1Feedback.fail("Not quite. Simply copy & paste an emoji here, like ❤️");
  }
  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 1, section: 1, valid },
    },
    '*',
  );
});

const emoji2Feedback = createInputFeedback(emoji2InputCheck);
emojiTwoInput.addEventListener("change", () => {
  let valid = false;
  if (isEmoji(emojiTwoInput.value)) {
    valid = true;
    circleButtons[1].innerText = emojiTwoInput.value;
    emoji2Feedback.succeed();
  } else {
    valid = false;
    circleButtons[1].innerText = "";
    emoji2Feedback.fail("Not quite. Simply copy & paste an emoji here, like 🔥");
  }
  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 1, section: 2, valid },
    },
    '*',
  );
});

const emoji3Feedback = createInputFeedback(emoji3InputCheck);
const setEmoji3State = createEmoji3State();
emojiThreeInput.addEventListener("change", () => {
  let valid = false;
  if (isEmoji(emojiThreeInput.value)) {
    valid = true;
    setEmoji3State("emoji", true);
    emoji3Feedback.succeed();
  } else {
    valid = false;
    setEmoji3State("emoji", false);
    emoji3Feedback.fail("Not quite. Simply copy & paste an emoji here, like ✨");
  }
  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 1, section: 3, valid },
    },
    '*',
  );
});

const varDeclareFeedback = createInputFeedback(emoji3InputCheck);
varDeclareInput.addEventListener("change", () => {
  let valid = false;
  if (usedVariables.includes(varDeclareInput.value.trim())) {
    valid = false;
    setEmoji3State("declare", false);
    varDeclareFeedback.fail(
      "Not quite. Choose a variable name that isn't already in use."
    );
  } else if (isVariable(varDeclareInput.value)) {
    valid = true;
    varAssignInput.placeholder = varDeclareInput.value;
    setEmoji3State("declare", true);
    varDeclareFeedback.succeed();
  } else {
    valid = false;
    setEmoji3State("declare", false);
    varDeclareFeedback.fail(
      "Not quite. A variable's name should start with a letter and can only contain letters/numbers."
    );
  }

  if (varAssignInput.value === '') {
    valid = false;
    return;
  }

  if (isMatching(varDeclareInput, varAssignInput)) {
    valid = true;
    setEmoji3State("assign", true);
    varAssignFeedback.succeed();
  } else {
    valid = false;
    setEmoji3State("assign", false);
    varAssignFeedback.fail(
      "Remember to change the variable here as well..."
    );
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 1, section: 3, valid },
    },
    '*',
  );
});

const varAssignFeedback = createInputFeedback(emoji4InputCheck);
varAssignInput.addEventListener("change", () => {
  let valid = false;
  if (isMatching(varDeclareInput, varAssignInput)) {
    valid = true;
    setEmoji3State("assign", true);
    varAssignFeedback.succeed();
  } else {
    valid = false;
    setEmoji3State("assign", false);
    varAssignFeedback.fail(
      "Not quite. Type the EXACT name of the variable you entered for the 3rd emoji."
    );
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 1, section: 4, valid },
    },
    '*',
  );
});

// ACTIVITY 2

const isPixel = (input) => {
  const inputArr = input.trim().split("px")
  return inputArr.length === 2 && !isNaN(Number(inputArr[0])) && !inputArr[1]
  // return /\d/.test(input) && input.trim().slice(-2) === "px";
};

const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}

const widthFeedback = createInputFeedback(emoji5InputCheck);
widthInput.addEventListener("change", () => {
  let valid = false;
  if (isPixel(widthInput.value)) {
    valid = true;
    widthFeedback.succeed();
  } else {
    valid: false;
    widthFeedback.fail(
      "Not quite. Simply add a value in pixels here, like 80px, don't forget to add the 'px' at the end and no spaces."
    );
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 2, section: 1, valid },
    },
    '*',
  );
});

const heightFeedback = createInputFeedback(emoji6InputCheck);
heightInput.addEventListener("change", () => {
  let valid = false;
  if (isPixel(heightInput.value)) {
    valid = true;
    heightFeedback.succeed();
  } else {
    valid = false;
    heightFeedback.fail(
      "Not quite. Simply add a value in pixels here, like 80px, don't forget to add the 'px' at the end and no spaces."
    );
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 2, section: 2, valid },
    },
    '*',
  );
});

const bgColorFeedback = createInputFeedback(emoji7InputCheck);
backgroundColorInput.addEventListener("change", () => {
  let valid = false;
  if (isColor(backgroundColorInput.value)) {
    valid = true;
    bgColorFeedback.succeed();
  } else {
    valid = false;
    bgColorFeedback.fail(
      "Not quite. Simply add a color value, like 'red' or 'blue'."
    );
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 2, section: 3, valid },
    },
    '*',
  );
});

circleButtons.forEach((eachCircle) => {
  eachCircle.addEventListener("mouseenter", () => {
    eachCircle.style.width = widthInput.value;
    eachCircle.style.height = heightInput.value;
    eachCircle.style.backgroundColor = backgroundColorInput.value;
  });
});

circleButtons.forEach((eachCircle) => {
  eachCircle.addEventListener("mouseleave", () => {
    eachCircle.style.width = "";
    eachCircle.style.height = "";
    eachCircle.style.backgroundColor = "";
  });
});

// ACTIVITY 3

const confettiFeedback = createInputFeedback(emoji8InputCheck);
confettiInput.addEventListener("change", () => {
  let valid = false;
  if (confettiInput.value.trim() === "addConfetti()") {
    valid = true;
    confettiFeedback.succeed();
  } else {
    valid = true;
    confettiFeedback.fail("Not quite. Type 'addConfetti()' here.");
  }

  window.top.postMessage(
    {
      source: MESSAGE_SOURCE,
      action: 'SECTION_VALIDATION',
      payload: { activity: 3, section: 1, valid },
    },
    '*',
  );
});

const canvas = document.querySelector("#custom_canvas");

const jsConfetti = new JSConfetti({ canvas });

circleButtons.forEach((eachCircle) => {
  eachCircle.addEventListener("click", () => {
    const cleanconfettiInput = confettiInput.value
      .split("")
      .filter((e) => e !== " ")
      .join("");
    cleanconfettiInput === "addConfetti()" && jsConfetti.addConfetti();
  });
});
