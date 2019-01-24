const express = require('express');

const context = require('./context.js');


const router = express.Router();

router.get('/', (req, res) => {
  
  const ctx = context.getContext();
  
  res.render('index.html', ctx);
});

router.get('/:view.html', (req, res) => {
  
  const ctx = context.getContext();
  
  res.render(`${req.params.view}.html`, ctx)
});

router.get('/*/:view.html', (req, res) => {
  
  const ctx = context.getContext();
  
  res.render(req._parsedUrl.path.substr(1), ctx);
});

module.exports = router;
