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

function validatePhone(e) {
    e.preventDefault();
    const form = e.target;
    const phoneInput = form.querySelector(".phone-input");
    const error = form.querySelector(".phone-error");
    const phone = phoneInput.value.trim();

    error.className = "phone-error";
    error.textContent = "";

    if (phone === "") {
        error.textContent = "Phone number cannot be empty";
        error.classList.add("error", "show");
        return;
    }

    if (phone.includes(" ")) {
        error.textContent = "Phone number cannot contain spaces";
        error.classList.add("error", "show");
        return;
    }

    if (isNaN(phone)) {
        error.textContent = "Phone number must contain only digits";
        error.classList.add("error", "show");
        return;
    }

    if (!phone.startsWith("07")) {
        error.textContent = "Phone number must start with 07";
        error.classList.add("error", "show");
        return;
    }

    if (phone.length < 11) {
        error.textContent = "Phone number is too short";
        error.classList.add("error", "show");
        return;
    }

    if (phone.length > 11) {
        error.textContent = "Phone number is too long";
        error.classList.add("error", "show");
        return;
    }

    const phonePattern = /^07\d{9}$/;
    if (!phonePattern.test(phone)) {
        error.textContent = "Phone number format is invalid";
        error.classList.add("error", "show");
        return;
    }
}

document.querySelectorAll(".phone-form").forEach(form => {
    form.addEventListener("submit", validatePhone);
});