'use strict';
// load dotenv module to read .env file
require('dotenv').config();

// set port with Environment variable "SERVER_PORT" or use 8080 as default.
const PORT = process.env.SERVER_PORT || 8080;
// set runtime environment to switch between logic, depending on environment (production, development, ...). See ../notes/model.js
const NODE_ENV = process.env.NODE_ENV || 'development';

const DB_SERVER = process.env.DB_SERVER || 'localhost';
const CACHE_SERVER = process.env.CACHE_SERVER || 'localhost';

// export configurations
module.exports = { NODE_ENV, PORT, DB_SERVER, CACHE_SERVER };