// for newsletter
function validateEmail(e) {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector(".email-input");
    const error = form.querySelector(".email-error");
    const submitBtn = form.querySelector("button");

    const email = emailInput.value.trim();

    error.className = "email-error";
    error.textContent = "";

    if (email === "") {
        error.textContent = "Email cannot be empty";
        error.classList.add("error", "show");
        return;
    }

    if (email.includes(" ")) {
        error.textContent = "Email cannot contain spaces";
        error.classList.add("error", "show");
        return;
    }

    if (!email.includes("@")) {
        error.textContent = "Email must contain an '@' symbol";
        error.classList.add("error", "show");
        return;
    }

    if (email.split("@").length !== 2) {
        error.textContent = "Email must include only one '@' symbol";
        error.classList.add("error", "show");
        return;
    }

    const splitEmail = email.split("@");

    if (splitEmail[0].length === 0) {
        error.textContent = "Email must have characters before '@'";
        error.classList.add("error", "show");
        return;
    }

    if (splitEmail[0].length < 2) {
        error.textContent = "Email username is too short";
        error.classList.add("error", "show");
        return;
    }

    if (splitEmail[1].length === 0) {
        error.textContent = "Email must have a domain after '@'";
        error.classList.add("error", "show");
        return;
    }

    if (!splitEmail[1].includes(".")) {
        error.textContent = "Domain must include a '.'";
        error.classList.add("error", "show");
        return;
    }

    if (splitEmail[1].startsWith(".")) {
        error.textContent = "Domain cannot start with a '.'";
        error.classList.add("error", "show");
        return;
    }

    const splitDomain = splitEmail[1].split(".");

    if (splitDomain[1].length < 2) {
        error.textContent = "Domain extension must be at least 2 characters";
        error.classList.add("error", "show");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
        error.textContent = "Email format is invalid";
        error.classList.add("error", "show");
        return;
    }

    // if email valid
    error.textContent = "Subscribed!";
    error.classList.add("success", "show");

    emailInput.disabled = true;
    submitBtn.disabled = true;
}

document.querySelectorAll(".email-form").forEach(form => {
    form.addEventListener("submit", validateEmail);
});


// for forms
function isValidEmail(email) {
  if (email === "") return { valid: false, message: "Email cannot be empty" };
  if (email.includes(" ")) return { valid: false, message: "Email cannot contain spaces" };
  if (!email.includes("@")) return { valid: false, message: "Email must contain an '@' symbol" };
  if (email.split("@").length !== 2) return { valid: false, message: "Email must include only one '@' symbol" };

  const splitEmail = email.split("@");

  if (splitEmail[0].length === 0) return { valid: false, message: "Email must have characters before '@'" };
  if (splitEmail[0].length < 2) return { valid: false, message: "Email username is too short" };
  if (splitEmail[1].length === 0) return { valid: false, message: "Email must have a domain after '@'" };
  if (!splitEmail[1].includes(".")) return { valid: false, message: "Domain must include a '.'" };
  if (splitEmail[1].startsWith(".")) return { valid: false, message: "Domain cannot start with a '.'" };

  const splitDomain = splitEmail[1].split(".");
  if (splitDomain[1].length < 2) return { valid: false, message: "Domain extension must be at least 2 characters" };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(email)) return { valid: false, message: "Email format is invalid" };

  return { valid: true, message: "" };
}


function isValidPhone(phone, optional = false) {
  if (phone === "") {
    return optional
      ? { valid: true, message: "" }
      : { valid: false, message: "Phone number cannot be empty" };
  }

  if (phone.includes(" ")) return { valid: false, message: "Phone number cannot contain spaces" };
  if (isNaN(phone)) return { valid: false, message: "Phone number must contain only digits" };
  if (!phone.startsWith("07")) return { valid: false, message: "Phone number must start with 07" };
  if (phone.length < 11) return { valid: false, message: "Phone number is too short" };
  if (phone.length > 11) return { valid: false, message: "Phone number is too long" };

  const phonePattern = /^07\d{9}$/;
  if (!phonePattern.test(phone)) return { valid: false, message: "Phone number format is invalid" };

  return { valid: true, message: "" };
}