/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_comparison_exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export type cursor_ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** columns and relationships of "examples" */
export type examples = {
  __typename?: 'examples';
  created_at: Scalars['timestamptz'];
  example_name: Scalars['String'];
  id: Scalars['uuid'];
  short_description: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "examples" */
export type examples_aggregate = {
  __typename?: 'examples_aggregate';
  aggregate?: Maybe<examples_aggregate_fields>;
  nodes: Array<examples>;
};

/** aggregate fields of "examples" */
export type examples_aggregate_fields = {
  __typename?: 'examples_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<examples_max_fields>;
  min?: Maybe<examples_min_fields>;
};

/** aggregate fields of "examples" */
export type examples_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<examples_select_column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "examples". All fields are combined with a logical 'AND'. */
export type examples_bool_exp = {
  _and?: InputMaybe<Array<examples_bool_exp>>;
  _not?: InputMaybe<examples_bool_exp>;
  _or?: InputMaybe<Array<examples_bool_exp>>;
  created_at?: InputMaybe<timestamptz_comparison_exp>;
  example_name?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<uuid_comparison_exp>;
  short_description?: InputMaybe<String_comparison_exp>;
  updated_at?: InputMaybe<timestamptz_comparison_exp>;
};

/** unique or primary key constraints on table "examples" */
export type examples_constraint =
  /** unique or primary key constraint on columns "id" */
  'examples_pkey';

/** input type for inserting data into table "examples" */
export type examples_insert_input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  example_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  short_description?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type examples_max_fields = {
  __typename?: 'examples_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  example_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  short_description?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type examples_min_fields = {
  __typename?: 'examples_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  example_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  short_description?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "examples" */
export type examples_mutation_response = {
  __typename?: 'examples_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<examples>;
};

/** on_conflict condition type for table "examples" */
export type examples_on_conflict = {
  constraint: examples_constraint;
  update_columns?: Array<examples_update_column>;
  where?: InputMaybe<examples_bool_exp>;
};

/** Ordering options when selecting data from "examples". */
export type examples_order_by = {
  created_at?: InputMaybe<order_by>;
  example_name?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  short_description?: InputMaybe<order_by>;
  updated_at?: InputMaybe<order_by>;
};

/** primary key columns input for table: examples */
export type examples_pk_columns_input = {
  id: Scalars['uuid'];
};

/** select columns of table "examples" */
export type examples_select_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'example_name'
  /** column name */
  | 'id'
  /** column name */
  | 'short_description'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "examples" */
export type examples_set_input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  example_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  short_description?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "examples" */
export type examples_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: examples_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type examples_stream_cursor_value_input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  example_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  short_description?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "examples" */
export type examples_update_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'example_name'
  /** column name */
  | 'id'
  /** column name */
  | 'short_description'
  /** column name */
  | 'updated_at';

export type examples_updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<examples_set_input>;
  where: examples_bool_exp;
};

/** mutation root */
export type mutation_root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "examples" */
  delete_examples?: Maybe<examples_mutation_response>;
  /** delete single row from the table: "examples" */
  delete_examples_by_pk?: Maybe<examples>;
  /** insert data into the table: "examples" */
  insert_examples?: Maybe<examples_mutation_response>;
  /** insert a single row into the table: "examples" */
  insert_examples_one?: Maybe<examples>;
  /** update data of the table: "examples" */
  update_examples?: Maybe<examples_mutation_response>;
  /** update single row of the table: "examples" */
  update_examples_by_pk?: Maybe<examples>;
  /** update multiples rows of table: "examples" */
  update_examples_many?: Maybe<Array<Maybe<examples_mutation_response>>>;
};

/** mutation root */
export type mutation_rootdelete_examplesArgs = {
  where: examples_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_examples_by_pkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type mutation_rootinsert_examplesArgs = {
  objects: Array<examples_insert_input>;
  on_conflict?: InputMaybe<examples_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_examples_oneArgs = {
  object: examples_insert_input;
  on_conflict?: InputMaybe<examples_on_conflict>;
};

/** mutation root */
export type mutation_rootupdate_examplesArgs = {
  _set?: InputMaybe<examples_set_input>;
  where: examples_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_examples_by_pkArgs = {
  _set?: InputMaybe<examples_set_input>;
  pk_columns: examples_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_examples_manyArgs = {
  updates: Array<examples_updates>;
};

/** column ordering options */
export type order_by =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

export type query_root = {
  __typename?: 'query_root';
  /** fetch data from the table: "examples" */
  examples: Array<examples>;
  /** fetch aggregated fields from the table: "examples" */
  examples_aggregate: examples_aggregate;
  /** fetch data from the table: "examples" using primary key columns */
  examples_by_pk?: Maybe<examples>;
};

export type query_rootexamplesArgs = {
  distinct_on?: InputMaybe<Array<examples_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by>>;
  where?: InputMaybe<examples_bool_exp>;
};

export type query_rootexamples_aggregateArgs = {
  distinct_on?: InputMaybe<Array<examples_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by>>;
  where?: InputMaybe<examples_bool_exp>;
};

export type query_rootexamples_by_pkArgs = {
  id: Scalars['uuid'];
};

export type subscription_root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "examples" */
  examples: Array<examples>;
  /** fetch aggregated fields from the table: "examples" */
  examples_aggregate: examples_aggregate;
  /** fetch data from the table: "examples" using primary key columns */
  examples_by_pk?: Maybe<examples>;
  /** fetch data from the table in a streaming manner: "examples" */
  examples_stream: Array<examples>;
};

export type subscription_rootexamplesArgs = {
  distinct_on?: InputMaybe<Array<examples_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by>>;
  where?: InputMaybe<examples_bool_exp>;
};

export type subscription_rootexamples_aggregateArgs = {
  distinct_on?: InputMaybe<Array<examples_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by>>;
  where?: InputMaybe<examples_bool_exp>;
};

export type subscription_rootexamples_by_pkArgs = {
  id: Scalars['uuid'];
};

export type subscription_rootexamples_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<examples_stream_cursor_input>>;
  where?: InputMaybe<examples_bool_exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type timestamptz_comparison_exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type uuid_comparison_exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type delete_examplesMutationVariables = Exact<{
  where: examples_bool_exp;
}>;

export type delete_examplesMutation = {
  __typename?: 'mutation_root';
  delete_examples?: {
    __typename?: 'examples_mutation_response';
    affected_rows: number;
    returning: Array<{
      __typename?: 'examples';
      created_at: any;
      example_name: string;
      id: any;
      short_description: string;
      updated_at: any;
    }>;
  } | null;
};

export type delete_examples_by_pkMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type delete_examples_by_pkMutation = {
  __typename?: 'mutation_root';
  delete_examples_by_pk?: {
    __typename?: 'examples';
    created_at: any;
    example_name: string;
    id: any;
    short_description: string;
    updated_at: any;
  } | null;
};

export type insert_examplesMutationVariables = Exact<{
  objects: Array<examples_insert_input> | examples_insert_input;
  on_conflict?: InputMaybe<examples_on_conflict>;
}>;

export type insert_examplesMutation = {
  __typename?: 'mutation_root';
  insert_examples?: {
    __typename?: 'examples_mutation_response';
    affected_rows: number;
    returning: Array<{
      __typename?: 'examples';
      created_at: any;
      example_name: string;
      id: any;
      short_description: string;
      updated_at: any;
    }>;
  } | null;
};

export type insert_examples_oneMutationVariables = Exact<{
  object: examples_insert_input;
  on_conflict?: InputMaybe<examples_on_conflict>;
}>;

export type insert_examples_oneMutation = {
  __typename?: 'mutation_root';
  insert_examples_one?: {
    __typename?: 'examples';
    created_at: any;
    example_name: string;
    id: any;
    short_description: string;
    updated_at: any;
  } | null;
};

export type update_examplesMutationVariables = Exact<{
  _set?: InputMaybe<examples_set_input>;
  where: examples_bool_exp;
}>;

export type update_examplesMutation = {
  __typename?: 'mutation_root';
  update_examples?: {
    __typename?: 'examples_mutation_response';
    affected_rows: number;
    returning: Array<{
      __typename?: 'examples';
      created_at: any;
      example_name: string;
      id: any;
      short_description: string;
      updated_at: any;
    }>;
  } | null;
};

export type update_examples_by_pkMutationVariables = Exact<{
  _set?: InputMaybe<examples_set_input>;
  pk_columns: examples_pk_columns_input;
}>;

export type update_examples_by_pkMutation = {
  __typename?: 'mutation_root';
  update_examples_by_pk?: {
    __typename?: 'examples';
    created_at: any;
    example_name: string;
    id: any;
    short_description: string;
    updated_at: any;
  } | null;
};

export type update_examples_manyMutationVariables = Exact<{
  updates: Array<examples_updates> | examples_updates;
}>;

export type update_examples_manyMutation = {
  __typename?: 'mutation_root';
  update_examples_many?: Array<{
    __typename?: 'examples_mutation_response';
    affected_rows: number;
    returning: Array<{
      __typename?: 'examples';
      created_at: any;
      example_name: string;
      id: any;
      short_description: string;
      updated_at: any;
    }>;
  } | null> | null;
};

export type examplesQueryVariables = Exact<{
  distinct_on?: InputMaybe<
    Array<examples_select_column> | examples_select_column
  >;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by> | examples_order_by>;
  where?: InputMaybe<examples_bool_exp>;
}>;

export type examplesQuery = {
  __typename?: 'query_root';
  examples: Array<{
    __typename?: 'examples';
    created_at: any;
    example_name: string;
    id: any;
    short_description: string;
    updated_at: any;
  }>;
};

export type examples_aggregateQueryVariables = Exact<{
  columns?: InputMaybe<Array<examples_select_column> | examples_select_column>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  distinct_on?: InputMaybe<
    Array<examples_select_column> | examples_select_column
  >;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<examples_order_by> | examples_order_by>;
  where?: InputMaybe<examples_bool_exp>;
}>;

export type examples_aggregateQuery = {
  __typename?: 'query_root';
  examples_aggregate: {
    __typename?: 'examples_aggregate';
    aggregate?: {
      __typename?: 'examples_aggregate_fields';
      count: number;
    } | null;
    nodes: Array<{
      __typename?: 'examples';
      created_at: any;
      example_name: string;
      id: any;
      short_description: string;
      updated_at: any;
    }>;
  };
};

export type examples_by_pkQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type examples_by_pkQuery = {
  __typename?: 'query_root';
  examples_by_pk?: {
    __typename?: 'examples';
    created_at: any;
    example_name: string;
    id: any;
    short_description: string;
    updated_at: any;
  } | null;
};

export const delete_examplesDocument = gql`
  mutation delete_examples($where: examples_bool_exp!) {
    delete_examples(where: $where) {
      affected_rows
      returning {
        created_at
        example_name
        id
        short_description
        updated_at
      }
    }
  }
`;
export const delete_examples_by_pkDocument = gql`
  mutation delete_examples_by_pk($id: uuid!) {
    delete_examples_by_pk(id: $id) {
      created_at
      example_name
      id
      short_description
      updated_at
    }
  }
`;
export const insert_examplesDocument = gql`
  mutation insert_examples(
    $objects: [examples_insert_input!]!
    $on_conflict: examples_on_conflict
  ) {
    insert_examples(objects: $objects, on_conflict: $on_conflict) {
      affected_rows
      returning {
        created_at
        example_name
        id
        short_description
        updated_at
      }
    }
  }
`;
export const insert_examples_oneDocument = gql`
  mutation insert_examples_one(
    $object: examples_insert_input!
    $on_conflict: examples_on_conflict
  ) {
    insert_examples_one(object: $object, on_conflict: $on_conflict) {
      created_at
      example_name
      id
      short_description
      updated_at
    }
  }
`;
export const update_examplesDocument = gql`
  mutation update_examples(
    $_set: examples_set_input
    $where: examples_bool_exp!
  ) {
    update_examples(_set: $_set, where: $where) {
      affected_rows
      returning {
        created_at
        example_name
        id
        short_description
        updated_at
      }
    }
  }
`;
export const update_examples_by_pkDocument = gql`
  mutation update_examples_by_pk(
    $_set: examples_set_input
    $pk_columns: examples_pk_columns_input!
  ) {
    update_examples_by_pk(_set: $_set, pk_columns: $pk_columns) {
      created_at
      example_name
      id
      short_description
      updated_at
    }
  }
`;
export const update_examples_manyDocument = gql`
  mutation update_examples_many($updates: [examples_updates!]!) {
    update_examples_many(updates: $updates) {
      affected_rows
      returning {
        created_at
        example_name
        id
        short_description
        updated_at
      }
    }
  }
`;
export const examplesDocument = gql`
  query examples(
    $distinct_on: [examples_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [examples_order_by!]
    $where: examples_bool_exp
  ) {
    examples(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      example_name
      id
      short_description
      updated_at
    }
  }
`;
export const examples_aggregateDocument = gql`
  query examples_aggregate(
    $columns: [examples_select_column!] = [id]
    $distinct: Boolean = true
    $distinct_on: [examples_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [examples_order_by!]
    $where: examples_bool_exp
  ) {
    examples_aggregate(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      aggregate {
        count(columns: $columns, distinct: $distinct)
      }
      nodes {
        created_at
        example_name
        id
        short_description
        updated_at
      }
    }
  }
`;
export const examples_by_pkDocument = gql`
  query examples_by_pk($id: uuid!) {
    examples_by_pk(id: $id) {
      created_at
      example_name
      id
      short_description
      updated_at
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    delete_examples(
      variables: delete_examplesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<delete_examplesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<delete_examplesMutation>(
            delete_examplesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'delete_examples',
        'mutation',
      );
    },
    delete_examples_by_pk(
      variables: delete_examples_by_pkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<delete_examples_by_pkMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<delete_examples_by_pkMutation>(
            delete_examples_by_pkDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'delete_examples_by_pk',
        'mutation',
      );
    },
    insert_examples(
      variables: insert_examplesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<insert_examplesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<insert_examplesMutation>(
            insert_examplesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'insert_examples',
        'mutation',
      );
    },
    insert_examples_one(
      variables: insert_examples_oneMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<insert_examples_oneMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<insert_examples_oneMutation>(
            insert_examples_oneDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'insert_examples_one',
        'mutation',
      );
    },
    update_examples(
      variables: update_examplesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<update_examplesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<update_examplesMutation>(
            update_examplesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'update_examples',
        'mutation',
      );
    },
    update_examples_by_pk(
      variables: update_examples_by_pkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<update_examples_by_pkMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<update_examples_by_pkMutation>(
            update_examples_by_pkDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'update_examples_by_pk',
        'mutation',
      );
    },
    update_examples_many(
      variables: update_examples_manyMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<update_examples_manyMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<update_examples_manyMutation>(
            update_examples_manyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'update_examples_many',
        'mutation',
      );
    },
    examples(
      variables?: examplesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<examplesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<examplesQuery>(examplesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'examples',
        'query',
      );
    },
    examples_aggregate(
      variables?: examples_aggregateQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<examples_aggregateQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<examples_aggregateQuery>(
            examples_aggregateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'examples_aggregate',
        'query',
      );
    },
    examples_by_pk(
      variables: examples_by_pkQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<examples_by_pkQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<examples_by_pkQuery>(
            examples_by_pkDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'examples_by_pk',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
