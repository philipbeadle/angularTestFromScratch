#Angular Testing From Scratch 
This project is to demonstrate how to go from an empty folder to a tested Angular App.
It will use Cucumber.js and protractor for automating the UI.
The app will have an Express service to demonstrate how to use super-test-as-promised for testing APIs

####How to follow this tutorial
The code is all in github repo https://github.com/philipbeadle/angularTestFromScratch
* Open a Terminal window
* Clone the repo locally and switch to branch Step1
_If you don't know how to set up SSH connections to Github check this article [SSH for github](https://help.github.com/articles/generating-an-ssh-key/)_
```
git clone git@github.com:philipbeadle/angularTestFromScratch.git
```

##Step 1
```
git checkout Step1
```
This has a basic skeleton of an Angular app with no code at all.  Its shows a basic structure for an app that 
interacts with a backend Node Express Server.

##Step 2
```
git checkout Step2
```
This step shows a completed Angular app that shows off some basic elements and concepts such as lists and forms
See [Build Angular in 30 minutes](http://www.revillweb.com/tutorials/angularjs-in-30-minutes-angularjs-tutorial/) for how this was built
##Step 3
This step shows how to add super-test-as-promised and build some API tests before the API is built.  Test Driven Development :)
Using the project as it is at Step 2 follow these steps to setup and write your first API test
* add this to the package.json file to describe the module we are building
```
{
  "name": "api-testing",
  "version": "0.0.1",
  "description": "API testing using super-test"
}
```
* cd into the tests/api folder
* "npm install supertest-as-promised --save"
    * This is the way we will call the REST end points
* "npm install mocha --save" 
    * This is the test runner
* "npm install chai --save" 
    * This is the assertion library
* "npm install chai-subset chai-things --save" 
    * This allows us to use a more natural language with our tests.
* Create a test folder under the api folder.
* Add a new file called globals.js to the api/test folder and add this code so we can refer to 'supertest','chai' anywhere in the tests
```
global.supertest = require('super-test');
global.chai = require('chai');
global.assert = chai.assert;
chai.should();
```
* Add a file called httpCodes.js, we will write our first test in here as shown.  This uses mocha to run the test, supertest to do the http request and chai to assert that the response code was 200.
```
describe('GET / download', function(){
  it('should return a 200', function(){
    return supertest('http://localhost:3000')
      .get('/retrieve')
      .expect(200);
  })
});
```
* Add a section called scripts to the package.json file to make it simple to run the tests
```
{
  "name": "api-testing",
  "version": "0.0.1",
  "description": "API testing using super-test",
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha"
  },
```
* You can now run tests with 
```
npm test
```
> The test will fail as it is supposed to because there is now service to request yet.  This is the first step of red, Green, Refactor which is the TDD mantra.
> Lets create the server and return a response to make this test pass.
* We will use the Express server for node so create a new package.json file and add the same info as above and then run "npm install express --save" 
* Now add this code to the server/server.js file

```
    var express = require('express');
    var app = express();
    
    app.get('/retrieve', function (req, res) {
      res.send('Hello World!');
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
```
* Add the following script to make it easy to launch the server
```
    "scripts": {
        "serve": "node server/server.js"
      }
```
* Now type "npm run serve" and you will see "Example app listening on port 3000!" in the console.
* Now run your tests and you will get a passing test!! Congratulations!
```
git checkout Step3
```




*Inspiration from [Build Angular in 30 minutes](http://www.revillweb.com/tutorials/angularjs-in-30-minutes-angularjs-tutorial/)
