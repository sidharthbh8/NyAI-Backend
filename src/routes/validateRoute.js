const express = require('express');
const bodyParser = require('body-parser');
const { isValidVoterId } = require('../utils/voterid');
const { validatePan } = require('../utils//pancard');

const router = new express.Router()

router.post('/validate-id', (req, res) => {
  const { idType, idNumber } = req.body;

  if (!idType || !idNumber) {
    return res.status(400).json({ error: 'Both idType and idNumber are required.' });
  }

  let isValid = false;

  switch (idType) {
    case 'voterId':
      isValid = isValidVoterId(idNumber);
      break;
    case 'panCard':
      isValid = validatePan(idNumber);
      break;
    default:
      return res.status(400).json({ error: 'Invalid idType. Use "voterId" or "panCard".' });
  }

  if (isValid) {
    res.json({ message: 'Valid ID.' });
  } else {
    res.status(400).json({ error: 'Invalid ID.' });
  }
});

module.exports = router