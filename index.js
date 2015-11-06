#! /usr/bin/env node

var watch = require("watch");
var readlineSync = require('readline-sync');
var Mission = require("./Mission.js");
var path = require("path");
var workingPath = process.cwd();
var config;
try{
	config = require(path.join(workingPath, "tdd.config.js"));
}
catch(e) {
	console.error("Your tdd config is not defined");
	process.exit();
}

if(!config.test) {
	console.error("You must define your test module!")
	process.exit();
}

var missionName = process.argv.slice(2).join(" ");

if(!missionName) {
	missionName = readlineSync.question('Please enter your mission: ');
}

var mission = new Mission(missionName);

console.log("Your mission " + mission.name + " starts now");
console.log("Tell me when you finish the configuration of tests. I'm waiting here...");
var testFinished = false;
while(!testFinished) {
	var tmpInput = readlineSync.question("Have you finished?(Yes/No/Skip): ");
	tmpInput = tmpInput.toLowerCase();
	if(tmpInput.indexOf("yes") >= 0 || tmpInput.indexOf("skip") >= 0) {
		testFinished = true;
	}
	else {
		console.log("Come on! You can do it!");
	}
}
console.log("Time to write some real code!");

if(config.beforeTest) {
	console.log("Your development environment should be started soon..");
	config.beforeTest();
}

if(config.test) {
	watch.watchTree(workingPath, {
		ignoreDirectoryPattern :  /node_modules/
	}, config.test.bind(this, testResultHandler));
}

function testResultHandler(result) {
	if(result) {
		testSuccessHandler();
	}
	else{
		testFailedHandler();
	}
}

function testSuccessHandler() {
	console.log("Congratulation!! ");
	if(config.afterTest) {
		config.afterTest(function() {
			console.log("Your mission is finished!");
			process.exit();
		});
	}
	else{
		console.log("Your mission is finished!");
		process.exit();
	}
}

function testFailedHandler() {
	console.error("Come on! You almost made it!");
}