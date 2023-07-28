// Step 1: Get form and other necessary elements from the HTML
const form = document.getElementById("registrationForm");
const responseDiv = document.getElementById("response");
const clearBtn = document.getElementById("clearBtn");
const exampleInfoDiv = document.getElementById("exampleInfo");

// Step 2: Initialize an array to store registered user information
const registeredInfo = [];

// Step 3: Add an event listener for form submission
function onSubmit() {
  // Prevent the form from submitting and refreshing the page
//   event.preventDefault();

  // Step 4: Get values from input fields
  const email = form.email.value;
  const telephone = form.telephone.value;
  const date = form.date.value;
  const text = form.text.value;

  // Step 5: Check for validation errors
  let hasErrors = false;

  // Validate email
  if (!isValidEmail(email)) {
    showError("Please enter a valid Email.", "email");
    hasErrors = true;
  }

  // Validate telephone number
  if (!isValidTelephone(telephone)) {
    showError("Please enter a valid phone number.", "telephone");
    hasErrors = true;
  }

  // Validate date
  if (!isValidDate(date)) {
    showError("Please enter a date between 1990 and 2007.", "date");
    hasErrors = true;
  }

  // Step 6: If there are validation errors, stop further processing
  if (hasErrors) {
    return;
  }

  // Step 7: Save user information in an object and add it to the registeredInfo array
  const info = { email, telephone, date, text };
  registeredInfo.push(info);

  // Step 8: Display the thank you message
  const responseText = generateResponseMessage();
  responseDiv.innerHTML = responseText;
  responseDiv.style.display = "block";
  responseDiv.style.backgroundColor = "#6c63ff"; // Blue-purple color for the thank you message background
  responseDiv.style.color = "white";

  // Step 9: Clear form inputs and error messages
  clearFormInputs();
}

// Step 10: Add event listener for clear button to reset form and hide thank you message
function onClearBtn()  {
  clearFormInputs();
  responseDiv.style.display = "none";
}

// Step 11: Define functions for input validation

function isValidEmail(email) {
  // Use a regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidTelephone(telephone) {
  // Use a regular expression to validate Moroccan telephone number format
  const telephonePattern = /^(|06|07)\d{8}$/;
  return telephonePattern.test(telephone);
}

function isValidDate(date) {
  // Check if the date is within the range of 1990-01-01 and 2007-12-31
  const minDate = new Date("1990-01-01");
  const maxDate = new Date("2007-12-31");
  const selectedDate = new Date(date);
  return selectedDate >= minDate && selectedDate <= maxDate;
}

// Step 12: Define function to display error messages

function showError(message, fieldId) {
  // Create a new error message element and append it after the input field
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.classList.add("error-message");

  const inputField = document.getElementById(fieldId);
  inputField.insertAdjacentElement("afterend", errorDiv);
}

// Step 13: Define function to clear form inputs and error messages

function clearFormInputs() {
  // Clear input values
  form.email.value = "";
  form.telephone.value = "";
  form.date.value = "";
  form.text.value = "";

  // Remove error messages
  const errorMessages = document.getElementsByClassName("error-message");
  while (errorMessages.length > 0) {
    errorMessages[0].remove();
  }
}

// Step 14: Define function to generate the thank you message

function generateResponseMessage() {
  if (registeredInfo.length === 0) {
    return "No registrations yet.";
  }

  // Generate the thank you message with registered information
  const responseText = registeredInfo.map((info) => {
    return `
      Email: ${info.email}<br>
      Telephone: ${info.telephone}<br>
      Date: ${info.date}<br>
      Text: ${info.text}<br><br>
    `;
  }).join('');

  return `Thank you for registration!<br><br>Your information is as follows:<br><br>${responseText}`;
}

// Step 15: Add event listener to toggle the example info div

function clearMsg ()  {
  if (exampleInfoDiv.style.display === "none") {
    exampleInfoDiv.style.display = "block";
  } else {
    exampleInfoDiv.style.display = "none";
  }
}


