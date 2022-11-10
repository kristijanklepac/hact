# Hasura Actions Generator

     _   _    _    ____ _____           _   _                                _        _   _                      _    ____ ___  
    | | | |  / \  / ___|_   _|         | | | | __ _ ___ _   _ _ __ __ _     / \   ___| |_(_) ___  _ __  ___     / \  |  _ \_ _| 
    | |_| | / _ \| |     | |    _____  | |_| |/ _` / __| | | | '__/ _` |   / _ \ / __| __| |/ _ \| '_ \/ __|   / _ \ | |_) | |  
    |  _  |/ ___ \ |___  | |   |_____| |  _  | (_| \__ \ |_| | | | (_| |  / ___ \ (__| |_| | (_) | | | \__ \  / ___ \|  __/| |  
    |_| |_/_/   \_\____| |_|           |_| |_|\__,_|___/\__,_|_|  \__,_| /_/   \_\___|\__|_|\___/|_| |_|___/ /_/   \_\_|  |___| 

## What are Hasura Actions? ​

Actions are a way to extend Hasura's schema with custom business logic using custom queries and mutations. Actions can be added to Hasura to handle various use cases such as data validation, data enrichment from external sources and any other complex business logic. HACT is complete Node.js/Express APP for generate (clone) all queries/mutations/actions from Hasura so they can be used as API endpoints and you can extended them with your custom business logic. This application helps you to build all the boring stuff in no time. For example... when you create table or action in Hasura with just few simple commands you will have all the queries/mutations/actions cloned here for that table so it can be used right away in your routes(endpoints). HACT can derive and generate TypeScript types and resolvers for you. Another benefit is that it will guarantee your schema and queries/mutation are valid otherwise it won't compile.

*IMPORTANT: This app is not meant to be complete production solution, instead it's use is to provide starter template for quickly build any type of API based on Hasura

## Prerequisites

- Docker installed on your machine
- You must be familiar with Hasura (howTo setup, run, create tables, migrations, etc...)
- TypeScript, Node.js, Express, Postgres

## How to use

- clone this repo and install it with npm install
- run: npm run hasura:up -> this will spinout local docker hasura instance on http://localhost:8123
- cd to: hasuraDev/
- run: hasura console --admin-secret=myadminsecretkey --endpoint=http://localhost:8123
- your Hasura will be up and running on http://localhost:9695/ -> use "myadminsecretkey" as secret for login to console
- create some table and add some data -> you will se new migration inside hasuraDev/migrations
- open second terminal and cd to your root of HACT app
- run: npm run generate:schema -> this will generate schema.graphql from current Hasura into graphql/schema.graphql
- run: node generator -> this will generate gql files (clones) of queries/mutations/actions. Check graphql/operations to see files!
- all queries and mutations available in Hasura are cloned to our app so we can now generate Typescript resolvers and types
- run: npm run generate:all
- INFO: you can use npm run hact:all it will run generate:schema and node generator and generate:all as single command
- now you have all the types and resolvers inside src/generated/graphql.ts
- if you add new tables or actions or maybe you alter something in existing tables in Hasura simply rerun npm run hact:all and you will have everything synced in your src/generated/graphql.ts

## How to create route (endpoint)

- run in terminal: npm run route:cli -> answer questions in terminal
    1. ? Do you want to create new route? (Y/n) -> Y
    2. ? Please insert route fileName -> testRoute.js
    3. ? Please insert route path (e.g. my-custom-path-for-this-route) -> test-route

    Your route (endpoint) is created and you can find it inside src/routes/testRoute.js.
    After you add route restart app: make start (make sure that both Hasura and HACT are running)-> Now you can check this route with Postman http://localhost:1111/api/test-route

## Add busines logic inside route (example)

    /* eslint-disable @typescript-eslint/no-unused-vars */
    import express, { NextFunction, Request, Response } from 'express';
    const router = express.Router();
    // hasuraGraphQLClient -> graphql request to Hasura
    import { hasuraGraphQLClient } from './graphqlClients';
    // from ./generated/graphql we get all our resolvers and types :)
    import { getSdk } from './generated/graphql';

    router.post(
    '/test-route',
        async (_req: Request, _res: Response, _next: NextFunction) => {
            // when we send undefined then HASURA ADMIN SECRET will be used for fetch data
            const client = getSdk(hasuraGraphQLClient(undefined));

            const result = await client.examples_by_pk({
                id: 'e5347c92-4841-4a91-adf8-fc4a103f08fc',
            });

            // ADD YOUR BUSSINES LOGIC BEFORE RETURN RESULT

            _res.status(200).json({ result });
        },
    );
