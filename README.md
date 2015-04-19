# grunt
##Essential AngularJS
/src
	/app
		app.js
			angular.module('example-app', [
				'example-app.login'
			])

		/login
			login.js
				angular.module('example-app.login', [
				])

				routings	|
				controller(s)	|
				services	|
				directives	| that are specific for this module

			login.spec.js						loginSpec.js		??
				describe(“example-app.login”, function () {
				
				});

			login.tpl.html						loginTemplate.html	??

	index.html

## Barebone GruntJS
- watch source code and automatically build when it changes
- run JSHint to make sure there are no obvious flubs and keep the style consistent
- run the unit tests
- start local development server that will serve the file while working
- convert all html partial templates to Javascript objects
 
'''sh
$ npm install -g grunt-cli
'''
/example-app
	package.json
  '''sh
		{
			"name": "example-app",
			"version": "0.1.0",
			"devDependencies": {
        "grunt": "~0.4.0",
        "grunt-contrib-watch": "~0.4.0"
      }
  '''

'''sh
$ npm install
'''
    }
