/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import inquirer from 'inquirer';

import slugify from 'slugify';
import { camelCase } from 'lodash';
import * as fsx from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import chalk from 'chalk';
import { outputFile } from '../../src/utils/outputFile';
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
log(chalk.bgBlueBright.bold(`\n ⚡️ 'Hi, welcome to Route CLI Generator' \n`));

const mainQuestion = [
  {
    type: 'confirm',
    name: 'route_confirm',
    message: 'Do you want to create new route?',
    default: true,
  },
];

const questions = [
  {
    type: 'input',
    name: 'route_name',
    message: 'Please insert route fileName',
    validate(value: string) {
      const valid = typeof value === 'string' && value.length > 5;
      return valid || 'Please enter route name longer than 5 chars!';
    },
  },
  {
    type: 'input',
    name: 'route_path',
    message: 'Please insert route path (e.g. my-custom-path-for-this-route)',
    validate(value: string) {
      const valid = typeof value === 'string' && value.length > 2;
      return valid || 'Please enter route path longer than 2 chars!';
    },
  },
];

inquirer.prompt(mainQuestion).then((answers) => {
  if (answers.route_confirm) {
    inquirer.prompt(questions).then(async (answers) => {
      log(
        chalk
          .hex('#DEADED')
          .bold(
            `\n*******************************************************************************************************************************`,
          ),
      );

      const fileName = camelCase(answers.route_name);
      const slug = slugify(answers.route_path, {
        strict: true,
      });
      const dirPath = `${cwd()}/src/routes/`;
      const exists = await fsx.pathExists(
        path.join(dirPath, `./${fileName}.route.ts`),
      );

      if (!exists && fileName.length > 2) {
        const stub = fs.readFileSync(
          `${cwd()}/system/stubs/route.stubs`,
          'utf8',
        );

        const placeholderReplace = stub.replace(/ROUTE/g, slug);

        const filePath = path.join(dirPath, `${fileName}.route.ts`);

        await outputFile(filePath, placeholderReplace);
      }
    });
  }
});
