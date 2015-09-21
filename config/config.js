var path = require("path"),
    rootPath = path.normalize(__dirname + '/..');

module.exports = 
    {
			production: {
        db: 'mongodb://localhost/jumpersup_db',
				url: 'http://localhost:8080',
        root: rootPath,
        app: {
          name: 'JumpersUp'
        },
        port: 8010
      },
      development: {
        db:"mongodb://localhost/jumpersup_db_dev",
				url: 'https://localhost:8080',
        root: rootPath,
        app: {
          name: 'JumpersUp Dev'
        },
        port: 8010
      },
      test: {
        db: 'mongodb://localhost/jumpersup_db_test',
				url: 'http://localhost:8090',
        root: rootPath,
        app: {
          name: 'JumpersUp Test'
        },
        port: 8015
      }
    };
