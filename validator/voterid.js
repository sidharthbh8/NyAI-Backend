const voterIdPattern = /^[A-Z]{3}[0-9]{7}$/;

function isValidVoterId(voterId) {
  return voterIdPattern.test(voterId);
}


const voterIdToCheck = "NB03064888"; 
if (isValidVoterId(voterIdToCheck)) {
  console.log("Valid voter ID");
} else {
  console.log("Invalid voter ID");
}
