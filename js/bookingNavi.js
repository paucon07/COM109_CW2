console.log("JS loaded");
let currentStep = 1;

function showStep(step) {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";

    document.getElementById("step" + step).style.display = "block";
}

function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        showStep(currentStep);
        updateProgress();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

function updateProgress() {
    console.log("Updating progress. Current step:", currentStep);
    const progress = document.getElementById("progress");
    const circles = document.querySelectorAll(".step-circle");

    // Reset all circles
    circles.forEach(circle => circle.classList.remove("active"));

    // Progress logic
    if (currentStep === 1) {
        progress.style.width = "0%";
        circles[0].classList.add("active");
    } 
    else if (currentStep === 2) {
        progress.style.width = "50%";
        circles[0].classList.add("active");
        circles[1].classList.add("active");
    } 
    else if (currentStep === 3) {
        progress.style.width = "100%";
        circles.forEach(circle => circle.classList.add("active"));
    }
}

updateProgress();

function validateStep1() {
    const forename = document.querySelector('input[name="forename"]');
    const surname = document.querySelector('input[name="surname"]');
    const phone = document.querySelector('input[name="phone"]');
    const email = document.querySelector('input[name="email"]');
    const guests = document.querySelector('input[name="guests"]');

    // Clear previous errors
    let errorMessage = "";

    // Name validation (no numbers)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(forename.value)) {
        errorMessage += "Forename must not contain numbers\n";
    }
    if (!nameRegex.test(surname.value)) {
        errorMessage += "Surname must not contain numbers\n";
    }

    // Phone validation (numbers only)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone.value)) {
        errorMessage += "Phone number must not contain letters\n";
    }

    // Email validation (must contain @)
    if (!email.value.includes("@")) {
        errorMessage += "Email must contain '@'\n";
    }

    // Guests validation (min 1)
    if (guests.value < 1 || guests.value === "") {
        errorMessage += "Guests must be at least 1\n";
    }

    // If errors exist → show alert
    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }
    console.log("Updating progress. Current step:");
    // If all valid → proceed
    nextStep();
    
}

function validateStep2() {
    const startDateInput = document.querySelector('input[name="start-date"]');
    const endDateInput = document.querySelector('input[name="end-date"]');

    const startDateValue = startDateInput.value;
    const endDateValue = endDateInput.value;

    let errorMessage = "";

    // Convert to Date objects
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    // Check if dates are selected
    if (!startDateValue) {
        errorMessage += "Please select a start date\n";
    }

    if (!endDateValue) {
        errorMessage += "Please select an end date\n";
    }

    // Start date must be after today
    if (startDateValue && startDate <= today) {
        errorMessage += "Start date must be after today\n";
    }

    // End date must be after start date
    if (startDateValue && endDateValue && endDate <= startDate) {
        errorMessage += "End date must be after start date\n";
    }

    // Show errors
    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }

    // If valid → proceed
    nextStep();
    
}

const today = new Date().toISOString().split("T")[0];
document.querySelector('input[name="start-date"]').setAttribute("min", today);

function validateStep3() {
    const cardNumberInput = document.querySelector('input[name="card-number"]');
    const cardNameInput = document.querySelector('input[name="card-name"]');
    const cvcInput = document.querySelector('input[name="cvc"]');

    let errorMessage = "";

    // Remove spaces for validation
    const cardNumber = cardNumberInput.value.replace(/\s/g, "");

    // Card number: must be 16 digits
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(cardNumber)) {
        errorMessage += "Card number must be 16 digits\n";
    }

    // Name: letters only
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(cardNameInput.value)) {
        errorMessage += "Name must contain only letters\n";
    }

    // CVC: exactly 3 digits
    const cvcRegex = /^[0-9]{3}$/;
    if (!cvcRegex.test(cvcInput.value)) {
        errorMessage += "CVC must be 3 digits\n";
    }

    // Show errors
    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }

    // Success (for now just alert)
    alert("Booking Complete!");
}

const cardInput = document.querySelector('input[name="card-number"]');

cardInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, ""); // remove non-digits

    // Add space every 4 digits
    value = value.match(/.{1,4}/g)?.join(" ") || "";

    this.value = value;
});