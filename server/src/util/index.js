exports.validateInput = (input, type, min, max) => {
  //convert input to string and trim whitespace

  const sanitizedInput = String(input).trim();

  //Define regular expression for email and name validation
  const emailRegex =
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/;
  const nameRegex = /^[a-zA-Z-\s]+$/;

  //validate input based on the specified type

  switch (type) {
    case "email":
      return sanitizedInput.toLowerCase().match(emailRegex) !== null;
    case "name":
      return sanitizedInput.toLowerCase().match(nameRegex) !== null;
    case "length":
      return sanitizedInput.length >= min && sanitizedInput.length <= max;
    default:
      return false;
  }
};



exports.checkIfFieldsAreEmpty = (fields, reqBody) => {
  for (const field of fields) {
    if (!reqBody[field] || reqBody[field].trim() === '') {
      return `${field} should not be empty`;
    }
  }
  return null;
};

// utils/nhsNumberGenerator.js

// utils/nhsNumberGenerator.js

 // utils/nhsNumberGenerator.js

 // utils/nhsNumberGenerator.js

exports. generateNHSNumber = () => {
  const getRandomDigit = () => Math.floor(Math.random() * 9);
  let nhsNumber = '';
  for (let i = 0; i < 10; i++) {
    nhsNumber += getRandomDigit();
  }
  return nhsNumber;
};







