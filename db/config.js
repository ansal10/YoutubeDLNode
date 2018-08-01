module.exports = {
  "development": {
    "storage": "./db.sqlite",
    "dialect": "sqlite"
  },
  "test": {
	  "storage": "./dbtest.sqlite",
	  "dialect": "sqlite"
  },
  "production": {
	  "storage": "./dbprod.sqlite",
	  "dialect": "sqlite"
  }
};
