import path from 'path';
import glob from 'glob';
import express from 'express';
import Logger from '../logger';
const router = express.Router();

glob
  .sync(
    './src/routes/*.ts', // Include all js files recursively.
    {
      ignore: [
        './src/routes/index.ts', // Ignore it self...
        './src/routes/special/*.ts', // Ignore the ones in special folder.
      ],
    },
  )
  .forEach((file) => {
    const fileName = path.resolve(file);
    const fileExtension = path.extname(fileName);
    const fileBaseName = path.basename(fileName, fileExtension);

    // console.log(fileName);
    // console.log(fileExtension);
    // console.log(fileBaseName);

    if (fileBaseName.includes('.route')) {
      import(`./${fileBaseName}`).then(({ default: theDefault }) => {
        try {
          router.use(theDefault);
        } catch (error) {
          // log errors
          Logger.error(error);
          Logger.error(
            `Route is not defined properly. Check ./src/routes/${fileBaseName}.ts`,
          );
        }
      });
    }
  });

export default router;
