module.exports = {
	apps: [{
		name: 'API',
		script: 'bin/www',
		env: {
			NODE_ENV: 'development',
			PORT: 3000
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 9001
		}
	}]
};
