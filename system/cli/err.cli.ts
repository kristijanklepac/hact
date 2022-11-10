/* eslint-disable @typescript-eslint/no-unused-vars */
import inquirer from 'inquirer';
import Logger from '../../src/logger';
import * as fsx from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import chalk from 'chalk';
const log = console.log;
log(
  chalk
    .hex('#DEADED')
    .bold(
      `\n*******************************************************************************************************************************`,
    ),
);
log(
  chalk.bgBlueBright.bold(
    `\n ⚡️ Author: Kristijan Klepač <kklepac@iolap.com> \n`,
  ),
);
log(
  chalk.bgBlueBright.bold(`\n ⚡️ 'Hi, welcome to Error Message Generator' \n`),
);

const mainQuestion = [
  {
    type: 'confirm',
    name: 'err_confirm',
    message: 'Do you want to create new custom Error message?',
    default: true,
  },
];

const questions = [
  {
    type: 'list',
    name: 'err_type_stubs',
    message: 'Error type?',
    choices: [
      'Bad Request',
      'Internal Server Error',
      'No Content',
      'Not Found',
      'Unauthorized',
    ],
    filter(val: string) {
      let stubsPath = `${cwd()}/system/stubs/httpBadRequest.stubs`;
      switch (val) {
        case 'Bad Request':
          stubsPath = `${cwd()}/system/stubs/httpBadRequest.stubs`;
          break;
        case 'Not Found':
          stubsPath = `${cwd()}/system/stubs/httpNotFound.stubs`;
          break;
        case 'Internal Server Error':
          stubsPath = `${cwd()}/system/stubs/httpInternalServer.stubs`;
          break;
        case 'No Content':
          stubsPath = `${cwd()}/system/stubs/httpNoContent.stubs`;
          break;
        case 'Unauthorized':
          stubsPath = `${cwd()}/system/stubs/httpUnauthorized.stubs`;
          break;

        default:
          break;
      }
      return stubsPath;
    },
  },
  {
    type: 'input',
    name: 'err_name',
    message: 'Please insert error const name (as SCREAMING_SNAKE_CASE)?',
    validate(value: string) {
      const valid = typeof value === 'string' && value.length > 5;
      return valid || 'Please enter error name longer than 5 chars!';
    },
  },
  {
    type: 'input',
    name: 'err_message',
    message: 'Error message to display?',
    default: 'Error! Something went wrong!',
  },
];

inquirer.prompt(mainQuestion).then((answers) => {
  if (answers.err_confirm) {
    inquirer.prompt(questions).then((answers) => {
      log(
        chalk
          .hex('#DEADED')
          .bold(
            `\n*******************************************************************************************************************************`,
          ),
      );

      const appErrDir = `${cwd()}/src/exceptions/appErrors`;

      if (answers?.err_confirm) {
        fsx.ensureDir(appErrDir);
      }

      if (answers?.err_name) {
        const name = answers.err_name.toUpperCase().replace(/\s+/g, '_');
        // Logger.info(name);

        const stub = fs.readFileSync(path.join(answers.err_type_stubs), 'utf8');

        const filePath = path.join(appErrDir, `${name}.ts`);

        const placeholderReplace = stub.replace(
          /APP_ERROR_MESSAGE/g,
          answers.err_message,
        );

        // With Promises:
        fsx
          .outputFile(filePath, placeholderReplace)
          .then(() => fsx.readFile(filePath, 'utf8'))
          .then((_data) => {
            log(
              chalk
                .hex('#DEADED')
                .bold(`\n ✅ ${chalk.green.underline.bold(`SUCCESS!`)}`),
            );

            log(chalk.hex('#DEADED').bold(`\n ⚡️ Err name: ${name}.ts`));
            log(
              chalk
                .hex('#DEADED')
                .bold(`\n ⚡️ Path: /src/exceptions/appErrors/${name}.ts`),
            );
            log(
              chalk
                .hex('#DEADED')
                .bold(
                  `\n*******************************************************************************************************************************`,
                ),
            );
          })
          .catch((err) => {
            Logger.error(err);
          });
      }
    });
  }
});
