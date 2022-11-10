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
  documents: ['./graphql/operations/**/*.gql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        {
          add: {
            content: `/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */`,
          },
        },
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        enumsAsTypes: true,
        constEnums: true,
        namingConvention: 'keep',
        // namingConvention: './my-naming-fn'
      },
    },
    './graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
