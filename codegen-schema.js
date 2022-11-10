module.exports = {
  schema: [
    {
      'http://localhost:8123/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
      },
    },
  ],
  overwrite: true,
  generates: {
    './graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
