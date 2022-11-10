/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk';
import Logger from '../../src/logger';
import * as fsx from 'fs-extra';
const log = console.log;
export const outputFile = async (path: string, file: string) => {
  // Almost the same as writeFile (i.e. it overwrites),
  // except that if the parent directory does not exist, it's created.
  // file must be a file path (a buffer or a file descriptor is not allowed).
  const output = await fsx
    .outputFile(path, file)
    .then(() => fsx.readFile(path, 'utf8'))
    .then((_data) => {
      log(
        chalk
          .hex('#DEADED')
          .bold(`\n ✅ ${chalk.green.underline.bold(`SUCCESS!`)}`),
      );

      // log(chalk.hex('#DEADED').bold(`\n ⚡️ File: ${file}.ts`));
      log(chalk.hex('#DEADED').bold(`\n ⚡️ Path: ${path}`));
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

  return output;
};
