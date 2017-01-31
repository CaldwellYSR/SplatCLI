"use strict";

let chalk = require('chalk');
let clear = require('clear');
let CLI = require('clui');
let figlet = require('figlet');
let inquirer = require('inquirer');
let Preferences = require('preferences');
let Spinner = CLI.Spinner;
let GitHubAPI = require('github');
let _ = require('lodash');
let git = require('simple-git')();
let touch = require('touch');
let fs = require('fs');
