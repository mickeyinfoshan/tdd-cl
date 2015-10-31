#TDD Command Line Tool

A little command line tool for Test Driven Development(TDD).

###Install

    npm install -g tdd-cl --registry=http://npm.yeeuu.com
    

###Usage

First, you need to write a config file called "tdd.config.js", which exports an object with three methods: test, dev_env and production_build.
Here's a template:
    
    //tdd.config.js
    module.exports = {
    
        //called when your any file in this folder has beened modified
        //pass the result of test to done, like: done(isTestPassed)
        test : function(done){done(true)},
        
        //called before every mission starts
        dev_env : function(){},
        
        //called after all tests are passed
        test_sucess : function(done){done()}
    };

Second, run the command as below:
    
    tdd-start <Your mission's name>
    
Then you'll be asked to finish you test code. You can just type `yes` to tell the programme when you have done.

Then the dev_env defined in your config file will be set up and you can start to write some real code. The test code will be run when you modify any file in the project. When all tests are passed, which means your mission is completed, the programme will exit.

Here's a simple example:

>https://github.com/mjhlybmwq/Test-BuildAutomatically

That's all!


