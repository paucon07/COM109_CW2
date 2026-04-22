
let currentStep = 1;

const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navMenu.classList.toggle('open', !isOpen);
    });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
       navToggle.setAttribute('aria-expanded', 'false');
       navToggle.setAttribute('aria-label', 'Open navigation menu');
       navMenu.classList.remove('open');
    });
    });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      navMenu.classList.remove('open');
      navToggle.focus();
    }
  });
}

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

    let isValid = true;
    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");


    // Name validation (no numbers)
    const nameRegex = /^[A-Za-z]+$/;
    if(forename.value == ""){
        
        document.getElementById("forename-error").textContent = "Must enter forename";
        isValid = false
    }
    else if (!nameRegex.test(forename.value)) {
        document.getElementById("forename-error").textContent = "Forename cannot contain numbers";
        isValid = false
    }
    if(surname.value == ""){
        document.getElementById("surname-error").textContent = "Must enter surname";
        isValid = false
    }
    
    else if (!nameRegex.test(surname.value)) {
        document.getElementById("surname-error").textContent = "Surname cannot contain numbers";
        isValid = false
    }

    // Phone validation (numbers only)
    //const phoneRegex = /^[0-9]+$/;
    //if (!phoneRegex.test(phone.value)) {
       // errorMessage += "Phone number must not contain letters\n";
    //}
    const phonePattern = /^07\d{9}$/;
    if (phone.value === "") {     
        document.getElementById("phone-error").textContent = "Phone number cannot be empty";
        isValid = false
    }
    
    else if (phone.value.includes(" ")) {
        document.getElementById("phone-error").textContent = "Phone number cannot contain spaces";
        isValid = false
    }

    else if (isNaN(phone.value)) {
        document.getElementById("phone-error").textContent = "Phone number must contain only digits";
        isValid = false
    }

    else if (!phone.value.startsWith("07")) {
        document.getElementById("phone-error").textContent = "Phone number must start with 07";
        isValid = false
    }

    else if (phone.value.length < 11) {
        document.getElementById("phone-error").textContent = "Phone number too short";
        isValid = false
    }

    else if (phone.value.length > 11) {
        document.getElementById("phone-error").textContent = "Phone number too long";
        isValid = false
    }
    

    else if (!phonePattern.test(phone.value)){
        document.getElementById("phone-error").textContent = "Phone number format is invalid";
        isValid = false
    }
    // Email validation (must contain @)
    //if (!email.value.includes("@")) {
    //    errorMessage += "Email must contain '@'\n";
    //}
    const splitEmail = email.value.split("@");
    if (email.value === "") {
        document.getElementById("email-error").textContent = "Email cannot be empty";
        isValid = false
    }

    else if (email.value.includes(" ")) {
        document.getElementById("email-error").textContent = "Email cannot include spaces";
        isValid = false
    }

    else if (!email.value.includes("@")) {
        document.getElementById("email-error").textContent = "Email must include @";
        isValid = false
    }

    else if (email.value.split("@").length !== 2) {
        document.getElementById("email-error").textContent = "Email must only include 1 @";
        isValid = false
    }

    

    else if (splitEmail[0].length === 0) {
        document.getElementById("email-error").textContent = "Must have characters before @";
        isValid = false
    }

    else if (splitEmail[0].length < 2) {
        document.getElementById("email-error").textContent = "Email username too short";
        isValid = false
    }

    else if (splitEmail[1].length === 0) {
        document.getElementById("email-error").textContent = "Email must have domain after @";
        isValid = false
    }

    else if (!splitEmail[1].includes(".")) {
        document.getElementById("email-error").textContent = "Domain must include '.'";
        isValid = false
    }

    else if (splitEmail[1].startsWith(".")) {
        document.getElementById("email-error").textContent = "Domain cannot start with '.'";
        isValid = false
    }

    const splitDomain = splitEmail[1].split(".");

    if (splitDomain[1].length < 2) {
        document.getElementById("email-error").textContent = "Domain extension must be at least 2 characters";
        isValid = false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email.value)) {
        document.getElementById("email-error").textContent = "Email format invalid";
        isValid = false
    }

    // Guests validation (min 1)
    if (guests.value < 1 || guests.value === "") {
        document.getElementById("guest-error").textContent = "Must be minimum 1 guest";
        isValid = false
    }

    // If errors exist → show alert
    if (!isValid) return;
    
    nextStep();
    
}

function validateStep2() {
    const startDateInput = document.querySelector('input[name="start-date"]');
    const endDateInput = document.querySelector('input[name="end-date"]');

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    let isValid = true;

    // Clear errors
    document.getElementById("start-error").textContent = "";
    document.getElementById("end-error").textContent = "";

    const today = new Date();
    today.setHours(0,0,0,0);

    // Start date check
    if (!startDateInput.value) {
        document.getElementById("start-error").textContent = "Select a start date";
        isValid = false;
    } else if (startDate <= today) {
        document.getElementById("start-error").textContent = "Must be after today";
        isValid = false;
    }

    // End date check
    if (!endDateInput.value) {
        document.getElementById("end-error").textContent = "Select an end date";
        isValid = false;
    } else if (endDate <= startDate) {
        document.getElementById("end-error").textContent = "Must be after start date";
        isValid = false;
    }

    if (!isValid) return;

    nextStep();
    
}

const today = new Date().toISOString().split("T")[0];
document.querySelector('input[name="start-date"]').setAttribute("min", today);

function validateStep3() {
    const cardNumberInput = document.querySelector('input[name="card-number"]');
    const cardNameInput = document.querySelector('input[name="card-name"]');
    const cvcInput = document.querySelector('input[name="cvc"]');

    let isValid = true;

    // Clear errors
    document.getElementById("card-error").textContent = "";
    document.getElementById("name-error").textContent = "";
    document.getElementById("cvc-error").textContent = "";

    const cardNumber = cardNumberInput.value.replace(/\s/g, "");

    // Card number
    if (!/^[0-9]{16}$/.test(cardNumber)) {
        document.getElementById("card-error").textContent = "Must be 16 digits";
        isValid = false;
    }

    // Name
    if (!/^[A-Za-z\s]+$/.test(cardNameInput.value)) {
        document.getElementById("name-error").textContent = "Letters only";
        isValid = false;
    }

    // CVC
    if (!/^[0-9]{3}$/.test(cvcInput.value)) {
        document.getElementById("cvc-error").textContent = "3 digits only";
        isValid = false;
    }

    if (!isValid) return;

    // Success
    alert("Booking Succesful!");
    window.location.href = "home.html";
}

const cardInput = document.querySelector('input[name="card-number"]');

cardInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, ""); // remove non-digits

    // Add space every 4 digits
    value = value.match(/.{1,4}/g)?.join(" ") || "";

    this.value = value;
});

