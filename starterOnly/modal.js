function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const modalClose = document.querySelector('.close');
const content = document.querySelector('.content');
const errorMessages = document.querySelectorAll('.error-message');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal form
modalClose.addEventListener('click', function () {
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].classList.add('validForm');
  }
  for (let i = 0; i < formData.length; i++) {
    formData[i].getElementsByTagName('input')[0].classList.remove('noValid');
  }
  modalbg.style.display = 'none';
});

/**
 * Checking the validity of form fields
 * @returns true or false
 */
function validate() {
  let validity = true;
  // Validation of Firstname
  let firstName = formData[0].getElementsByTagName('input')[0].value;
  // Function to stock the value in localStorage
  stockageForm('firstName', firstName);
  // Condition to be valid >=2 and not a number
  let validFirstName = firstName.length >= 2 && isNaN(firstName);
  // Function errorMessage to show or not show the message
  errorMessage(validFirstName, 0);

  // Validation of Lastname
  let lastName = formData[1].getElementsByTagName('input')[0].value;
  stockageForm('lastName', lastName);
  let validLastName = lastName.length >= 2 && isNaN(firstName);
  errorMessage(validLastName, 1);

  // Validation of Email
  let email = formData[2].getElementsByTagName('input')[0].value;
  let validEmail = formData[2]
    .getElementsByTagName('input')[0]
    .reportValidity();
  stockageForm('email', email);
  errorMessage(validEmail, 2);

  // Validation of Birthdate
  let validBirthdate = formData[3].getElementsByTagName('input')[0].value;
  stockageForm('birthdate', validBirthdate);
  validBirthdate = validBirthdate === '' ? false : true;
  errorMessage(validBirthdate, 3);

  // Validation of Quantity
  let validQuantity = formData[4].getElementsByTagName('input')[0].value;
  stockageForm('quantity', validQuantity);
  validQuantity =
    validQuantity != '' &&
    !isNaN(validQuantity) &&
    validQuantity >= 0 &&
    validQuantity <= 99
      ? true
      : false;
  errorMessage(validQuantity, 4);

  // Validation of Location
  let validLocation = checkLocation();
  errorMessage(validLocation, 5);

  // Validation of Condition
  let validCondition = document.getElementById('checkbox1').checked;
  errorMessage(validCondition, 6);

  // Stockage if users want to be contact for more events
  let validContact = document.getElementById('checkbox2').checked;
  stockageForm('contact', validContact);

  // Verify if all fields are valid
  validity =
    validFirstName &&
    validLastName &&
    validEmail &&
    validBirthdate &&
    validQuantity &&
    validLocation &&
    validCondition;

  // Return the result of all verification
  return validity;
}
/**
 * Fonction to show or not the invalid message and border red
 * @param {the name of each validation fields} name
 * @param {number of the formData div} nbForm
 * @returns
 */
function errorMessage(name, nbForm) {
  if (name) {
    formData[nbForm].getElementsByTagName('p')[0].classList.add('validForm');
    formData[nbForm]
      .getElementsByTagName('input')[0]
      .classList.remove('noValid');
  } else {
    formData[nbForm].getElementsByTagName('p')[0].classList.remove('validForm');
    formData[nbForm].getElementsByTagName('input')[0].classList.add('noValid');
  }
  return;
}
/**
 * Function to check if a location is checked
 * @returns true or false
 */
function checkLocation() {
  const radios = document.querySelectorAll('input[name="location"]');
  // Check if radio button is checked
  for (let i = 0; i < radios.length; i++) {
    // If checked return true
    if (radios[i].checked) {
      // Stock the radio value
      let choice = radios[i].value;
      stockageForm('location', choice);
      return true;
    }
  }
  return false;
}

/**
 * Function to stock in localStorage informations
 */
function stockageForm(name, value) {
  window.localStorage.setItem(name, value);
  return;
}

// Checking if the form passed validation with parameters
// window.location.search-> returns the character string in the url with the ?
// Creation of an object containing the parameters of the url
const urlParams = new URLSearchParams(window.location.search);
// Retrieving the value of the "location" field
const validParam = urlParams.get('location');
// Display of the confirmation modal
if (validParam != null) {
  modalbg.style.display = 'block';
  modalClose.style.display = 'none';
  document.getElementsByName('reserve')[0].style.display = 'none';
  // Creation of [div.final]
  let containerFinal = document.createElement('div');
  containerFinal.classList.add('final');
  // Creation of paragraph [p.final-paragraph]
  let paragraph = document.createElement('p');
  paragraph.classList.add('final-paragraph');
  // Content of paragraph
  paragraph.innerHTML = 'Merci pour <br> votre inscription';
  // Creation of the close button [button.btn-signup.closeButtonFinal]
  let button = document.createElement('button');
  button.classList.add('btn-signup', 'closeButtonFinal');
  button.textContent = 'Fermer';
  // Inserting the paragraph and the button in the [div.final]
  containerFinal.appendChild(paragraph);
  containerFinal.appendChild(button);
  // Creation of the cross to close the modal [span.closeFinal]
  let closeFinal = document.createElement('span');
  closeFinal.classList.add('closeFinal');
  // Insert in [div.content]
  content.appendChild(closeFinal);
  content.appendChild(containerFinal);
  const closeButtonFinal = document.querySelector('.closeButtonFinal');
  // Closure of the modal by the button
  if (closeButtonFinal != null) {
    closeButtonFinal.addEventListener('click', function () {
      modalbg.style.display = 'none';
      // Back to the homepage
      window.location.href = 'index.html';
    });
  }
  // Closure of the modal by the cross
  if (closeFinal != null) {
    closeFinal.addEventListener('click', function () {
      modalbg.style.display = 'none';
      // Back to the homepage
      window.location.href = 'index.html';
    });
  }
}
