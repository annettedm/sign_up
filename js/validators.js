export const validateRequired = (value) => {
  return testMatch(value, '', 'This field is required.')
}

export const validateEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return testMatch(value, emailPattern, 'The email is incorrect.');
}

export const validatePhone = (value) => {
  const phonePattern = /^\+[1-9]\d{1,14}$/;

  return testMatch(value, phonePattern, "The phone is incorrect. The format is +123451234567");
}

export const validatePasswordMatch = (value, matchValue) => {
  return testMatch(value, matchValue, `The passwords do not match.`);
}

const testMatch = (value, validateAgainst, errorMessage) => {
  let validResult = '';
  value = value.toString().trim();
  validateAgainst = validateAgainst.toString().trim();

  if (value === '' && validateAgainst !== '')
  return {isValid: true}  
  
  if (validateAgainst instanceof RegExp) {
    validResult = testPattern(value, validateAgainst);
  }

  if (validateAgainst === '') {
    validResult = value !== ""; 
  } else {
    validResult = value === validateAgainst;
  }

  if (validResult) {
    return { isValid: true };
  } 

  return { isValid: false, errorMessage: errorMessage };
}

const testPattern = (value, pattern) => {
  return pattern.test(value)
}