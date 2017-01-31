"use strict";

const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const figconst = require('figconst');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const Spinner = CLI.Spinner;
const GitHubAPI = require('github');
const _ = require('lodash');
const git = require('simple-git')();
const touch = require('touch');
const fs = require('fs');


