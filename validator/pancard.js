function validatePan(pan) {
    const panPattern = /^[A-Z]{5}\d{4}[A-Z]$/;

    return panPattern.test(pan);
  }
  
  const panToValidate = 'ABCDE1234A';
  const isValid = validatePan(panToValidate);
  
  if (isValid) {
    console.log(`The PAN '${panToValidate}' is valid.`);
  } else {
    console.log(`The PAN '${panToValidate}' is not valid.`);
  }
  