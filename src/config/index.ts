import dotenv from 'dotenv';
dotenv.config();
import convict from 'convict';
import convict_format_with_validator from 'convict-format-with-validator';

convict.addFormats(convict_format_with_validator);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    arg: 'nodeEnv',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 1234,
    // env: 'PORT',
    // arg: 'port',
  },
  hasura_graphql_url: {
    doc: 'Hasura GraphQL endpoint.',
    format: 'url',
    default: 'http://graphql-engine-hasura:8080/v1/graphql',
    // env: 'HASURA_GRAPHQL_URL',
    // arg: 'hasuraGraphqlUrl',
  },
  hasura_health_endpoint: {
    doc: 'Hasura Healthz endpoint.',
    format: 'url',
    default: 'http://localhost:8123/healthz',
  },
  hasura_admin_secret: {
    doc: 'Hasura GraphQL Admin Secret.',
    format: String,
    default: 'myadminsecretkey',
    env: 'HASURA_ADMIN_SECRET',
    arg: 'hasuraAdminSecret',
    sensitive: true,
  },
});

const env = config.get('env');
config.loadFile(`${__dirname}/${env}.json`);

config.validate({ allowed: 'strict' });

export const configuration = config.getProperties();
