/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { configuration } from './config';
import 'express-async-errors';
import express, { Application, NextFunction, Request, Response } from 'express';
import got from 'got';
import http from 'http';
import { errorHandler } from './exceptions/ErrorHandler';
import { createHttpTerminator } from 'http-terminator';
import Logger from './logger';
import morganMiddleware from './middleware/morgan';
import { getSdk } from './generated/graphql';
import ERR_NOT_FOUND from './exceptions/appErrors/ERR_NOT_FOUND';
import { throwErr } from './exceptions/throwErr';
import figlet from 'figlet';
import chalk from 'chalk';
import { hasuraGraphQLClient } from './graphqlClients';
import AllRoutes from './routes';

const log = console.log;

const noRetryGot = got.extend({
  retry: {
    limit: 0,
  },
});

export const app: Application = express();
app.disable('x-powered-by');

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

server.listen(configuration.port, '0.0.0.0', () => {
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
    chalk.blue.bgBlue.bold(
      figlet.textSync(' HACT - Hasura Actions API ', {
        horizontalLayout: 'controlled smushing',
      }),
    ),
  );
  // Combine styled and normal strings
  log(
    chalk
      .hex('#DEADED')
      .bold(
        `\n ⚡️[NODE_ENV]: ${chalk.red.underline.bold(
          `${process.env.NODE_ENV?.toUpperCase()}`,
        )}`,
      ),
  );
  log(
    chalk
      .hex('#DEADED')
      .bold(` ⚡️[HASURA_GRAPHQL]: ${configuration.hasura_graphql_url}`),
  );
  const addy = server.address();
  log(
    chalk
      .hex('#DEADED')
      .bold(` ⚡️[SERVER]: Server is running on: ${JSON.stringify(addy)}\n`),
  );
  log(
    chalk
      .hex('#DEADED')
      .bold(
        `*******************************************************************************************************************************`,
      ),
  );
});

app.use(morganMiddleware);

app.use('/api', AllRoutes);

app.get(
  '/hasura-healthcheck',
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const healthy = await noRetryGot(
      'http://host.docker.internal:8123/healthz',
      {
        timeout: {
          request: 30000, // miliseconds
        },
      },
    ).text();

    _res.status(200).json({ healthy });
  },
);

app.get(
  '/example',
  async (_req: Request, _res: Response, _next: NextFunction) => {
    // when we send undefined then HASURA ADMIN SECRET will be used for fetch data
    const client = getSdk(hasuraGraphQLClient(undefined));

    const result = await client.examples_by_pk({
      id: 'e5347c92-4841-4a91-adf8-fc4a103f08fc',
    });

    _res.status(200).json({ result });
  },
);

app.all('*', async (_req: Request, _res: Response) => {
  console.log('404 Route');
  throwErr(ERR_NOT_FOUND);
});

app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
  Logger.error(
    `⚡️[ERROR]: Message: ${JSON.stringify(err.message)}, err: ${JSON.stringify(
      err,
    )}`,
  );
  next(err);
});

app.use((err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  errorHandler.handleError(err, _res);
});
