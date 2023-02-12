'use strict';
const { NODE_ENV, DB_SERVER } = require('../util/config');
const mysql = require("mysql2");

// docker healthcheck
const connection = mysql.createConnection({
    host: DB_SERVER,
    user: 'fhj',
    password: 'password',
    database: 'contdel',
});

// get all notes
function getAll() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM greetings';
	connection.execute(query, (error, rows) => {
		if (error) {
			console.log(error);
			reject(error);
		} else {
			console.log("Database Query is finished");
			resolve(rows);
		}
	});
  });
}

// get one note by it's id
function getOne(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM greetings WHERE id = ?';
	  
    console.log('getOne', id);
    if (id == 666) {
      return reject(new Error('number of the beast'));
    }
	connection.execute(query, [id], (error, rows) => {
		if (error) {
			console.log(error);
			reject(error);
		} else {
			console.log("Database Query is finished");
			resolve(rows);
		}
	});
  });
}

module.exports = {
  get(id) {
    if (!id) {
      return getAll();
    } else {
      return getOne(id);
    }
  }
};
