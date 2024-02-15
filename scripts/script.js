const dayInput = document.getElementById("day__input");
const monthInput = document.getElementById("month__input");
const yearInput = document.getElementById("year__input");
const calculateBtn = document.getElementById("calculate-btn");
const dayErrorFeedback = document.getElementById("error-day");
const monthErrorFeedback = document.getElementById("error-month");
const yearErrorFeedback = document.getElementById("error-year");
const dayLabel = document.getElementById("label-day");
const monthLabel = document.getElementById("label-month");
const yearLabel = document.getElementById("label-year");
const yearOutputFig = document.getElementById("year-result");
const monthOutputFig = document.getElementById("month-result");
const dayOutputFig = document.getElementById("day-result");

// Error texts
const errorTexts = {
  requiredErr: "The field is required",
  invalidDay: "Must be a valid day",
  invalidMonth: "Must be a valid month",
  invalidYear: "Must be in the past",
  invalidDate: "Must be a valid date",
};

const today = new Date();

function limitToMaxLength(elem) {
  if (elem.value.length > parseInt(elem.maxLength)) {
    elem.value = elem.value.slice(0, parseInt(elem.maxLength));
  }
}

function disallowNonNumericInput(elem) {
  elem.value = elem.value.replace(/[e\+\-\.\s]/gi, '');
}

function showErrorFeedback(
  inputElem,
  inputElemLabels,
  errorFeedbackElem,
  errormsg
) {
  inputElem.classList.add("numinput_error");
  inputElemLabels.forEach((label) => {
    label.classList.add("input__label_error");
  });
  errorFeedbackElem.style.display = "block";
  errorFeedbackElem.textContent = errormsg;
}

function removeErrorFeedback(inputElem, inputElemLabels, errorFeedbackElem) {
  inputElem.classList.remove("numinput_error");
  inputElemLabels.forEach((label) => {
    label.classList.remove("input__label_error");
  });
  errorFeedbackElem.style.display = "none";
  errorFeedbackElem.textContent = "";
}

function filledInputs() {
  if (
    dayInput.checkValidity() &&
    monthInput.checkValidity() &&
    yearInput.checkValidity()
  ) {
    removeErrorFeedback(dayInput, [dayLabel], dayErrorFeedback);
    removeErrorFeedback(monthInput, [monthLabel], monthErrorFeedback);
    removeErrorFeedback(yearInput, [yearLabel], yearErrorFeedback);

    return true;
  } else {
    if (!dayInput.checkValidity()) {
      showErrorFeedback(
        dayInput,
        [dayLabel],
        dayErrorFeedback,
        errorTexts.requiredErr
      );
    } else {
      removeErrorFeedback(dayInput, [dayLabel], dayErrorFeedback);
    }

    if (!monthInput.checkValidity()) {
      showErrorFeedback(
        monthInput,
        [monthLabel],
        monthErrorFeedback,
        errorTexts.requiredErr
      );
    } else {
      removeErrorFeedback(monthInput, [monthLabel], monthErrorFeedback);
    }

    if (!yearInput.checkValidity()) {
      showErrorFeedback(
        yearInput,
        [yearLabel],
        yearErrorFeedback,
        errorTexts.requiredErr
      );
    } else {
      removeErrorFeedback(yearInput, [yearLabel], yearErrorFeedback);
    }
  }
}

function goodDateInputs() {
  const dateToCheck = new Date(
    `${yearInput.value}/${monthInput.value}/${dayInput.value}`
  );

  if (
    dayInput.value <= 31 &&
    monthInput.value <= 12 &&
    yearInput.value <= today.getFullYear() &&
    dateToCheck < today
  ) {
    return true;
  } else {
    if (!(dayInput.value <= 31)) {
      showErrorFeedback(
        dayInput,
        [dayLabel],
        dayErrorFeedback,
        errorTexts.invalidDay
      );
    }

    if (!(monthInput.value <= 12)) {
      showErrorFeedback(
        monthInput,
        [monthLabel],
        monthErrorFeedback,
        errorTexts.invalidMonth
      );
    }

    if (!(yearInput.value <= today.getFullYear()) || !(dateToCheck < today)) {
      showErrorFeedback(
        yearInput,
        [yearLabel],
        yearErrorFeedback,
        errorTexts.invalidYear
      );
    }
  }
}

function dateExist() {
  const dateObj = new Date(
    `${yearInput.value}/${monthInput.value}/${dayInput.value}`
  );
  if (monthInput.value == dateObj.getMonth()) {
    showErrorFeedback(
      dayInput,
      [dayLabel, monthLabel, yearLabel],
      dayErrorFeedback,
      errorTexts.invalidDate
    );
    return false;
  } else {
    removeErrorFeedback(
      dayInput,
      [dayLabel, monthLabel, yearLabel],
      dayErrorFeedback
    );
    return true;
  }
}

function calculateAge(enteredDate) {
  var today = moment();
  var diff = moment.preciseDiff(enteredDate, today, true);
  yearOutputFig.textContent = diff.years;
  monthOutputFig.textContent = diff.months;
  dayOutputFig.textContent = diff.days;
}

dayInput.addEventListener("input", (e) => {
  limitToMaxLength(e.target);
  disallowNonNumericInput(e.target);
});

monthInput.addEventListener("input", (e) => {
  limitToMaxLength(e.target);
  disallowNonNumericInput(e.target);
});

yearInput.addEventListener("input", (e) => {
  limitToMaxLength(e.target);
  disallowNonNumericInput(e.target);
});

calculateBtn.addEventListener("click", () => {
  if (filledInputs()) {
    if (goodDateInputs() && dateExist()) {
      calculateAge(
        moment(`${yearInput.value}-${monthInput.value}-${dayInput.value}`)
      );
    }
  }
});
