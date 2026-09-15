const buttons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".content-section");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    sections.forEach(function (sec) {
      sec.classList.remove("active");
    });

    button.classList.add("active");
    const targetName = button.getAttribute("data-target");
    const targetSection = document.querySelector(
      `[data-content="${targetName}"]`,
    );

    if (targetSection) {
      targetSection.classList.add("active");
    }
  });
});

// Universal Calculator Module Switching
const calcButtons = document.querySelectorAll(".action-btn[data-calc]");
const contentSections = document.querySelectorAll(".content-section");
const backButtons = document.querySelectorAll(".action-btn[data-back]");

calcButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const calcType = event.currentTarget.getAttribute("data-calc");

    contentSections.forEach(function (sec) {
      sec.classList.remove("active");
    });

    let targetView =
      document.querySelector(`[data-content="${calcType}-calculator"]`) ||
      document.querySelector(`[data-content="${calcType}"]`);

    if (targetView) {
      targetView.classList.add("active");
    }
  });
});

// Universal Back Button Logic
backButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    const backTarget = event.currentTarget.getAttribute("data-back");

    contentSections.forEach(function (sec) {
      sec.classList.remove("active");
    });

    const parentSection = document.querySelector(
      `[data-content="${backTarget}"]`,
    );
    if (parentSection) {
      parentSection.classList.add("active");
    }
  });
});
// Standard Calculator Logic
const stdScreen = document.querySelector(
  '[data-content="standard-calculator"] .calculator-screen input',
);
const stdBtns = document.querySelectorAll(
  '[data-content="standard-calculator"] .buttons button',
);

stdBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") {
      stdScreen.value = "";
    } else if (action === "calculate") {
      try {
        stdScreen.value = eval(stdScreen.value);
      } catch {
        stdScreen.value = "Error";
      }
    } else {
      stdScreen.value += action || value;
    }
  });
});

// Scientific Calculator Logic
const sciScreen = document.querySelector(
  '[data-content="scientific-calculator"] .calculator-screen input',
);
const sciBtns = document.querySelectorAll(
  '[data-content="scientific-calculator"] .buttons button',
);

function getFactorial(n) {
  if (n < 0) return "Error";
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

sciBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") {
      sciScreen.value = "";
    } else if (action === "dc") {
      sciScreen.value = sciScreen.value.slice(0, -1);
    } else if (action === "!") {
      let num = Number(sciScreen.value);
      sciScreen.value = getFactorial(num);
    } else if (action === "calculate") {
      try {
        let expression = sciScreen.value;

        expression = expression.replaceAll("sin(", "Math.sin(");
        expression = expression.replaceAll("cos(", "Math.cos(");
        expression = expression.replaceAll("tan(", "Math.tan(");
        expression = expression.replaceAll("log(", "Math.log10(");
        expression = expression.replaceAll("ln(", "Math.log(");
        expression = expression.replaceAll("√(", "Math.sqrt(");
        expression = expression.replaceAll("∛(", "Math.cbrt(");

        sciScreen.value = eval(expression);
      } catch {
        sciScreen.value = "Error";
      }
    } else {
      sciScreen.value += action || value;
    }
  });
});
// temp convertor logic
const tempInput = document.querySelector(".temp-input");
const tempScreen = document.querySelector(".temp-screen input");
const cToFBtn = document.querySelector(".c-to-f-btn");
const fToCBtn = document.querySelector(".f-to-c-btn");

function celsiusToFahrenheit() {
  let num = tempInput.value;

  if (num === "") {
    tempScreen.value = "Enter value";
  } else {
    let result = (Number(num) * 9) / 5 + 32;
    tempScreen.value = result + " °F";
  }
}

function fahrenheitToCelsius() {
  let num = tempInput.value;

  if (num === "") {
    tempScreen.value = "Enter value";
  } else {
    let result = ((Number(num) - 32) * 5) / 9;
    tempScreen.value = result + " °C";
  }
}

cToFBtn.addEventListener("click", celsiusToFahrenheit);
fToCBtn.addEventListener("click", fahrenheitToCelsius);

/*speed convertor logic*/
const speedInput = document.querySelector(".speed-input");
const speedScreen = document.querySelector(".speed-screen input");
const kmhToMphBtn = document.querySelector(".kmh-to-mph-btn");
const mphToKmhBtn = document.querySelector(".mph-to-kmh-btn");

function convertKmhToMph() {
  let num = speedInput.value;

  if (num === "") {
    speedScreen.value = "Enter value";
  } else {
    // 1 km/h = 0.621371 mph
    let result = Number(num) * 0.621371;
    speedScreen.value = result + " Mph";
  }
}

function convertMphToKmh() {
  let num = speedInput.value;

  if (num === "") {
    speedScreen.value = "Enter value";
  } else {
    // 1 mph = 1.60934 km/h
    let result = Number(num) * 1.60934;
    speedScreen.value = result + " Km/h";
  }
}

kmhToMphBtn.addEventListener("click", convertKmhToMph);
mphToKmhBtn.addEventListener("click", convertMphToKmh);

/*bill splliter logic*/
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const billScreen = document.querySelector(".bill-screen input");
const splitBtn = document.querySelector(".split-btn");

function calculateSplit() {
  let bill = billInput.value;
  let people = peopleInput.value;

  if (bill === "" || people === "") {
    billScreen.value = "Enter value";
  } else {
    let totalBill = Number(bill);
    let totalPeople = Number(people);

    if (totalPeople <= 0) {
      billScreen.value = "Invalid people";
    } else {
      let result = totalBill / totalPeople;
      billScreen.value = +result.toFixed(2) + " Each";
    }
  }
}

splitBtn.addEventListener("click", calculateSplit);

/*bmi logic*/
const weightInput = document.querySelector(".weight-input");
const heightInput = document.querySelector(".height-input");
const bmiScreen = document.querySelector(".bmi-screen-input");
const bmiBtn = document.querySelector(".bmi-btn");

function calculateBMI() {
  let weight = weightInput.value;
  let height = heightInput.value;

  if (weight === "" || height === "") {
    bmiScreen.value = "Enter value";
  } else {
    let w = Number(weight);
    let h = Number(height);

    if (h <= 0) {
      bmiScreen.value = "Invalid height";
    } else {
      let bmi = w / (h * h);
      let category = "";

      if (bmi < 18.5) {
        category = "Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
      } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
      } else {
        category = "Obese";
      }

      bmiScreen.value = bmi.toFixed(1) + " (" + category + ")";
    }
  }
}

bmiBtn.addEventListener("click", calculateBMI);
//water intake//
const waterWeightInput = document.querySelector(".water-weight-input");
const waterScreen = document.querySelector(".water-screen-input");
const waterBtn = document.querySelector(".water-btn");

function calculateWater() {
  let weight = waterWeightInput.value;

  if (weight === "") {
    waterScreen.value = "Enter value";
  } else {
    let w = Number(weight);

    if (w <= 0) {
      waterScreen.value = "Invalid weight";
    } else {
      // Standard formula: ~33 ml per kg of body weight, converted to liters
      let waterIntake = w * 0.033;
      waterScreen.value = waterIntake.toFixed(1) + " Liters / day";
    }
  }
}

waterBtn.addEventListener("click", calculateWater);
//velocity//
const velocityDistInput = document.querySelector(".velocity-dist-input");
const velocityTimeInput = document.querySelector(".velocity-time-input");
const velocityScreen = document.querySelector(".velocity-screen-input");
const velocityBtn = document.querySelector(".velocity-btn");

function calculateVelocity() {
  let distance = velocityDistInput.value;
  let time = velocityTimeInput.value;

  if (distance === "" || time === "") {
    velocityScreen.value = "Enter value";
  } else {
    let d = Number(distance);
    let t = Number(time);

    if (t <= 0) {
      velocityScreen.value = "Invalid time";
    } else {
      // Formula: Velocity = Distance / Time
      let velocity = d / t;
      velocityScreen.value = velocity.toFixed(2) + " m/s";
    }
  }
}

velocityBtn.addEventListener("click", calculateVelocity);

//acceleration logic//
const accelViInput = document.querySelector(".accel-vi-input");
const accelVfInput = document.querySelector(".accel-vf-input");
const accelTimeInput = document.querySelector(".accel-time-input");
const accelScreen = document.querySelector(".accel-screen-input");
const accelBtn = document.querySelector(".accel-btn");

function calculateAcceleration() {
  let vi = accelViInput.value;
  let vf = accelVfInput.value;
  let t = accelTimeInput.value;

  if (vi === "" || vf === "" || t === "") {
    accelScreen.value = "Enter value";
  } else {
    let initialV = Number(vi);
    let finalV = Number(vf);
    let time = Number(t);

    if (time <= 0) {
      accelScreen.value = "Invalid time";
    } else {
      let acceleration = (finalV - initialV) / time;
      accelScreen.value = acceleration.toFixed(2) + " m/s²";
    }
  }
}

accelBtn.addEventListener("click", calculateAcceleration);
//circle logoc//
const circleRadiusInput = document.querySelector(".circle-radius-input");
const circleScreen = document.querySelector(".circle-screen-input");
const circleBtn = document.querySelector(".circle-btn");

function calculateCircleArea() {
  let radius = circleRadiusInput.value;

  if (radius === "") {
    circleScreen.value = "Enter value";
  } else {
    let r = Number(radius);

    if (r < 0) {
      circleScreen.value = "Invalid radius";
    } else {
      // Formula: Area = π * r²
      let area = Math.PI * r * r;
      circleScreen.value = area.toFixed(2) + " units²";
    }
  }
}

/*triable*/
circleBtn.addEventListener("click", calculateCircleArea);
const triangleBaseInput = document.querySelector(".triangle-base-input");
const triangleHeightInput = document.querySelector(".triangle-height-input");
const triangleScreen = document.querySelector(".triangle-screen-input");
const triangleBtn = document.querySelector(".triangle-btn");

function calculateTriangleArea() {
  let base = triangleBaseInput.value;
  let height = triangleHeightInput.value;

  if (base === "" || height === "") {
    triangleScreen.value = "Enter value";
  } else {
    let b = Number(base);
    let h = Number(height);

    if (b <= 0 || h <= 0) {
      triangleScreen.value = "Invalid dimensions";
    } else {
      // Formula: Area = 0.5 * Base * Height
      let area = 0.5 * b * h;
      triangleScreen.value = area.toFixed(2) + " units²";
    }
  }
}

triangleBtn.addEventListener("click", calculateTriangleArea);

//text logic
const textInput = document.querySelector(".text-input");
const textScreen = document.querySelector(".text-screen-input");
const uppercaseBtn = document.querySelector(".uppercase-btn");
const lowercaseBtn = document.querySelector(".lowercase-btn");

function convertToUpperCase() {
  let text = textInput.value;

  if (text === "") {
    textScreen.value = "Enter text";
  } else {
    textScreen.value = text.toUpperCase();
  }
}

function convertToLowerCase() {
  let text = textInput.value;

  if (text === "") {
    textScreen.value = "Enter text";
  } else {
    textScreen.value = text.toLowerCase();
  }
}
uppercaseBtn.addEventListener("click", convertToUpperCase);
lowercaseBtn.addEventListener("click", convertToLowerCase);

/*paswors*/
const passwordInput = document.querySelector(".password-input");
const passwordScreen = document.querySelector(".password-screen-input");

function checkPasswordStrength() {
  let password = passwordInput.value;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  // Purani classes hata rahe hain taaki naya color/style theek se apply ho
  passwordScreen.classList.remove("weak", "medium", "strong");

  if (password === "") {
    passwordScreen.value = "";
  } 
  // 1. Strong: Uppercase, Lowercase, Number aur Symbol sab hon
  else if (hasUpper && hasLower && hasNumber && hasSymbol) {
    passwordScreen.value = "Strong";
    passwordScreen.classList.add("strong");
  } 
  // 2. Medium: Sirf Uppercase, Lowercase aur Number hon (Symbol na ho)
  else if (hasUpper && hasLower && hasNumber && !hasSymbol) {
    passwordScreen.value = "MSedium";
    passwordScreen.classList.add("medium");
  } 
  // 3. Weak: Jab user ne sirf letters aur numbers enter kiye hon ya baqi cases hon
  else {
    passwordScreen.value = "Weak";
    passwordScreen.classList.add("weak");
  }
}

passwordInput.addEventListener("input", checkPasswordStrength);
const encoderInput = document.querySelector(".encoder-input");
const encoderScreen = document.querySelector(".encoder-screen-input");
const encodeBtn = document.querySelector(".encode-btn");

function encodeText() {
  let text = encoderInput.value;

  if (text === "") {
    encoderScreen.value = "Enter text";
  } else {
    // btoa() JavaScript ka built-in function hai jo text ko encode kar deta hai
    encoderScreen.value = btoa(text);
  }
}

encodeBtn.addEventListener("click", encodeText);

