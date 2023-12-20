const express = require('express')
const { searchLawyersNearby } = require('../utils/serpApi')

const router = new express.Router()

let lawyers = []
let isUpdating = false
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/lawyersNearby', async (req, res) => {
  if (!isUpdating) {
    isUpdating = true
    const { latitude, longitude } = req.body.coordinates
    try {
      const list = await searchLawyersNearby(latitude, longitude);
      lawyers = list;
      res.send(list);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).send({ error: 'Update in progress. Try again later' });
  }
})

router.get('/lawyersNearby', async (req, res) => {

  await new Promise(resolve => setTimeout(resolve, 3000)); // Adding a small delay for demonstration
  res.send(lawyers);
  console.log(lawyers);
});

module.exports = router