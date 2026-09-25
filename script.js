import {
  validateRequired,
  validateEmail,
  validatePhone,
  validatePasswordMatch
} from './js/validators.js';
import {
  runValidations
} from './js/validateTags.js';

const form = document.getElementById("create-user");

export const validators = {
  "required": validateRequired,
  "email": validateEmail,
  "phone": validatePhone,
  "password-match": validatePasswordMatch
}

const getInputsArray = () => {
  const allElements = Array.from(form.querySelectorAll('*'));
  
  return allElements.filter(element => {
    const attributeNames = element.getAttributeNames();
    
    return attributeNames.some(name => name.startsWith('validate-'));
  });
}
const inputsArray = getInputsArray();

const getSpan = (element) => {
  const parent = element.closest('.item-cont');
  
  return parent.querySelector('span');
}

const showErrors = (element, errors) => {
  const span = getSpan(element);

  element.classList.add('is-invalid');
  span.classList.add('error-message');

  const errorsString = errors.join(' ');
  span.textContent = errorsString;
}

const hideErrors = (element) => {
  const span = getSpan(element);

  element.classList.remove('is-invalid');
  span.classList.remove('error-message');
  span.textContent = "\u00A0";
}


form.addEventListener('submit', (e) => {
  let isValid = true;

  inputsArray.forEach((element) => {
    const errors = runValidations(element);
    if (errors.length > 0) showErrors(element, errors);

    isValid = isValid && errors.length === 0;
  });
  
  if (!isValid) e.preventDefault();
});

inputsArray.forEach((element) => {
  element.addEventListener('blur', (e) => {
    const errors = runValidations(element);
    if (errors.length > 0) {
     showErrors(element, errors); 
    } else {
      hideErrors(element);
    }
  })
});

// const email = document.getElementById("email");
// const emailError = document.getElementById("email-error");
    
// const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const emailErrorMessage = "I am expecting an email address.";

// function validateEmail() {
//   const value = email.value.trim();

//   if (value === '') {
//     clearError();
//     return true; 
//   }

//   if (!emailPattern.test(value)) {
//     setError(emailErrorMessage);
//     return false;
//   }

//   clearError();
//   return true;
// }

// email.addEventListener('blur', validateEmail);

// form.addEventListener('submit', (e) => {
//   const isValid = validateEmail();

//   if (!isValid) {
//     e.preventDefault();
//     setError(emailErrorMessage);
//   } else {
//     e.preventDefault();
//   }
// });

// const setError = (message) => {
//   email.classList.add('is-invalid');
//   emailError.classList.add('error-message');
//   emailError.textContent = message;
// }

// const clearError = () => {
//   email.classList.remove('is-invalid');
//   emailError.classList.remove('error-message');
// }


