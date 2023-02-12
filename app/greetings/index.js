'use strict';
const {
  listAction,
  detailAction,
} = require('./controller');

const router = require('express').Router();

// use HTTP request methods also often called HTTP verbs https://developer.mozilla.org/de/docs/Web/HTTP/Methods
router.get('/', listAction);
router.get('/:id', detailAction);

module.exports = router;
