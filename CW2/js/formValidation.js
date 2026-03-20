function validateEmail(e) // needs a better regex pattern and more personalised error msgs
{
  const email = document.getElementById("email").value;
  const error = document.getElementById("emailError");

  const emailPattern = /.+@.+\..+/;

  if (!email.includes("@")) 
  {
    e.preventDefault(); // prevents form from submitting
    error.textContent = "Email must contain an '@' symbol.";
    return;
  }

  if (!emailPattern.test(email)) 
  {
    e.preventDefault();
    error.textContent = "Please enter a valid email";
    return;
  } 

  error.textContent = ""; // if all the checks are passed

}

document.getElementById("contactForm").addEventListener("submit", validateEmail);