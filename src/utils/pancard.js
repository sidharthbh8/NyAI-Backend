const panPattern = /^[A-Z]{5}\d{4}[A-Z]$/;

function validatePan(pan) {
  return panPattern.test(pan);
}

module.exports = { validatePan };
