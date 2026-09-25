import {
  validateRequired,
  validateEmail,
  validatePhone,
  validatePasswordMatch
} from './validators.js';

import {
  validators
} from '../script.js';

const processValidateAttributes = (element) => {
  return element.getAttributeNames().filter(name => name.startsWith('validate-')).map(name => name.replace('validate-', ''));
}

const getMatchValue = (element) => {
  const matchTagId = element.getAttribute('dependant-id');

  if (!matchTagId) return;

  return document.getElementById(matchTagId).value.trim();
}


export const runValidations = (element) => {
  const attributes = processValidateAttributes(element);

  const errors = [];
  const matchValue = getMatchValue(element);
  
  attributes.forEach(attr => {
    let result = validators[attr](element.value, matchValue);

    if (!result.isValid) {
      errors.push(result.errorMessage);
    }
  });

  return errors;
}