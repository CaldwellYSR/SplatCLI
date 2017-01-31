#!/usr/bin/env node 

"use strict";

const CLI = require('clui');
const inquirer = require('inquirer');
const Spinner = CLI.Spinner;
let git = require('simple-git')();
const fs = require('fs');
const files = require('./lib/files');
const starterProject = 'https://github.com/SplatJS/splat-ecs-starter-project.git';

function createGame(next) {
    const args = require('minimist')(process.argv.slice(2));

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter a name for your game: ',
            default: args.name || args.n,
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return "Please enter a name for your game";
                }
            }
        },
        {
            type: 'input',
            name: 'repo',
            message: 'Git Repo:',
            default: args.r || args.repo,
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return "Please enter a git repo url";
                }
            }
        }
    ];

    inquirer.prompt(questions).then((answers) => {
        let status = new Spinner('Creating game...');
        status.start();
        let output;
        try {
            output = git.clone(starterProject, answers.name);
        } catch(err) {
            return next(err)
        }
        status.stop();
        return next(answers.repo, output._baseDir + "/" + answers.name);
    });
}

createGame((remote, gitDir) => {
    let status = new Spinner('Updating repo...');
    status.start();
    let git = require('simple-git')(gitDir);
    git.removeRemote("origin");
    if (remote.length) {
        git.addRemote("origin", remote);
    }
    status.stop();
    return true;
});
