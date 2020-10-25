#!/usr/bin/env node

'use strict';

// borrowed from https://github.com/facebook/create-react-app/blob/master/packages/create-react-app/index.js
var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 10) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Scan JSX Text requires Node 10 or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}

const { run } = require('./cli');

run();
