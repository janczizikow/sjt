'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const commander = require('commander');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const camelCase = require('lodash.camelcase');
const { getFileExtension } = require('./utils');
const pkg = require('./package.json');

function run() {
  let filePath;
  const program = new commander.Command(pkg.name)
    .version(pkg.version)
    .arguments('<file-path>')
    .usage(`${chalk.green('<file-path>')} [options]`)
    .action(p => {
      filePath = p;
    })
    .option(
      '--s, --silent',
      'prevent sjt from printing messages through the console'
    )
    .allowUnknownOption()
    .on('--help', () => {
      console.log();
      console.log(`Only ${chalk.green('<file-path>')} is required.`);
      console.log();
      console.log('Example:');
      console.log(`${chalk.cyan(pkg.name)} ${chalk.green('./src/app.js')}`);
    })
    .parse(process.argv);

  if (!filePath) {
    console.error(chalk.red('Please provide a filepath:'));
    console.log(`${chalk.cyan(pkg.name)} ${chalk.green('<file-path>')}`);
    console.log();
    console.log('For example:');
    console.log(`${chalk.cyan(pkg.name)} ${chalk.green('./src/app.js')}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${pkg.name} --help`)} to see all options.`);
    process.exit(1);
  }

  scan(path.resolve(filePath), !program.silent);
}

async function scan(file, enableLogging = true) {
  let i = 0;
  let content = '';
  let ast = null;
  const text = {};
  const fileExtension = getFileExtension(file);
  const fileName = fileExtension
    ? path.basename(file, `${fileExtension}`)
    : file;
  const fileWithExtension = fileExtension
    ? `${fileName}${fileExtension}`
    : fileName;

  if (enableLogging) {
    console.log(`Reading ${chalk.cyan(fileWithExtension)}...`);
    console.log('');
  }

  try {
    content = await fs.promises.readFile(file, 'utf8');
  } catch (err) {
    console.log(chalk.red(`Failed to read ${fileWithExtension}:`));
    console.log(err);
    console.log();
    process.exit(1);
  }

  try {
    ast = parse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        // flow and typescript plugins cannot be combined
        /jsx?/.test(fileWithExtension) ? 'flow' : 'typescript',
      ],
    });
  } catch (_err) {
    console.error(chalk.red(`Failed to parse ${fileWithExtension}`));
    console.error(
      chalk.red(
        `${pkg.name} cannot parse this file, are you sure it's a js or a typescript file?`
      )
    );
    console.log();
    process.exit(1);
  }

  traverse(ast, {
    JSXText(path) {
      // TODO: filter out empty line breaks in a better way
      if (!/\n\s*/.test(path.node.value)) {
        let key = camelCase(fileName) + '.' + camelCase(path.node.value);
        const keyExists = Object.prototype.hasOwnProperty.call(text, key);
        if (keyExists) {
          i++;
          key += i;
        }
        text[key] = path.node.value;
      }
    },
  });

  if (enableLogging) {
    console.log(
      `Copying text from ${chalk.cyan(`${fileWithExtension}`)} to ${chalk.cyan(
        fileName + '.json'
      )}`
    );
    console.log();
  }

  try {
    await fs.promises.writeFile(
      path.join(process.cwd(), `${fileName}.json`),
      JSON.stringify(text, null, 2) + os.EOL,
      { encoding: 'utf8' }
    );
    if (enableLogging) {
      console.log('Done.');
    }
  } catch (err) {
    console.log(chalk.red(`Failed to copy text from ${fileWithExtension}:`));
    console.log(err);
    console.log();
    process.exit(1);
  }
}

module.exports = {
  run,
};
