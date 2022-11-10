import { GraphQLClient } from 'graphql-request';
import { configuration } from '../config';

export const hasuraGraphQLClient = (token: string | undefined) => {
  // default return

  let gqpClient = new GraphQLClient(configuration.hasura_graphql_url);

  if (!token) {
    gqpClient = new GraphQLClient(configuration.hasura_graphql_url, {
      headers: {
        [`x-hasura-admin-secret`]: configuration.hasura_admin_secret,
      },
    });
  }

  if (token) {
    gqpClient = new GraphQLClient(configuration.hasura_graphql_url, {
      headers: {
        [`Authorization`]: `Bearer ${token.trim()}`,
      },
    });
  }

  return gqpClient;
};
