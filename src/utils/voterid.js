const voterIdPattern = /^[A-Z]{3}[0-9]{7}$/;

function isValidVoterId(voterId) {
  return voterIdPattern.test(voterId);
}

module.exports = { isValidVoterId };
