'use strict';
const redis = require("redis");
const model = require('./model');
const { CACHE_SERVER } = require('../util/config');

let redisClient;

(async () => {
  redisClient = redis.createClient({
	socket: {
        host: CACHE_SERVER,
        port: 6379
    }
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();


function listAction(req, res) {
  return new Promise((resolve, reject) => {
	  let isCached = false;
	  let greetings;
	  console.log('list overview');
	  
	  try{
		let cacheResults;
		(async () => {
			cacheResults = await redisClient.get('greetings');
		  
			if (cacheResults) {
			  console.log("cache call successful");
			  console.log(cacheResults);
			  isCached = true;
			  greetings = JSON.parse(cacheResults);
			} else {				
			  console.log("db call");
			  greetings = await model.get();
			  console.log(greetings);
			  await redisClient.set('greetings', JSON.stringify(greetings));
			}
			
			await res.json({
			  fromCache: isCached,
			  data: greetings,
			});
		})();
		
		
	  } catch(err){
		handleError(err, req, res)
	  };
  });
}

function detailAction(req, res) {  
  console.log('detail:', req.params.id);
  model
    .get(req.params.id)
    .then((greeting) => {
      if (greeting && greeting.length > 0) {
        res.json(greeting);
      } else {
        res
          .status(404)
          .json({ error: `could not find greeting with id [${req.params.id}]` });
      }
    })
    .catch((err) => handleError(err, req, res));
}

function handleError(err, req, res) {
  if (typeof err === 'object' && err.message) {
    err = { error: err.message };
  } else if (typeof err === 'string') {
    err = { error: err };
  } else {
    err = { error: 'unknown error occured' };
  }
  console.log(`ERROR on [${req.method}] via ${req.originalUrl}: [${err.error}]`);
  res.status(500).json(err);
}

module.exports = {
  listAction,
  detailAction,
};
