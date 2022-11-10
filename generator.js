/* eslint-disable */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const fsx = require('fs-extra');
const path = require('path');
const process = require('process');
const { Source, buildSchema } = require('graphql');

const generator = async () => {
  const schemaFilePath = `${process.cwd()}/graphql/schema.graphql`;
  const destDirPath = `${process.cwd()}/graphql/operations/`;
  const depthLimit = 2;
  const includeDeprecatedFields = false;
  const fileExtension = 'gql';
  const assumeValid = true;
  const includeCrossReferences = false;

  await fsx.ensureDir(destDirPath);

  let assume = false;
  if (assumeValid === 'true') {
    assume = true;
  }

  const typeDef = fsx.readFileSync(schemaFilePath, 'utf-8');
  const source = new Source(typeDef);
  const gqlSchema = buildSchema(source, { assumeValidSDL: assume });

  const getFieldArgsDict = (field, duplicateArgCounts, allArgsDict = {}) =>
    field.args.reduce((o, arg) => {
      if (arg.name in duplicateArgCounts) {
        const index = duplicateArgCounts[arg.name] + 1;
        duplicateArgCounts[arg.name] = index;
        o[`${arg.name}${index}`] = arg;
      } else if (allArgsDict[arg.name]) {
        duplicateArgCounts[arg.name] = 1;
        o[`${arg.name}1`] = arg;
      } else {
        o[arg.name] = arg;
      }
      return o;
    }, {});

  const getArgsToVarsStr = (dict) =>
    Object.entries(dict)
      .map(([varName, arg]) => `${arg.name}: $${varName}`)
      .join(', ');

  const getVarsToTypesStr = (dict) => {
    return Object.entries(dict)
      .map(([varName, arg]) => {
        // console.log(Object.entries(arg.type), 222)
        if (arg.name === 'path') return `$${varName}: ${arg.type} = "_"`; // default (without that queries won't work)
        if (arg.name === 'distinct') return `$${varName}: ${arg.type} = true`; // default (without that queries won't work)
        if (arg.name === 'columns') return `$${varName}: ${arg.type} = [id]`; // default (without that queries won't work)
        return `$${varName}: ${'' + arg.type}`;
      })
      .join(', ');
  };

  const generateQuery = (
    curName,
    curParentType,
    curParentName,
    argumentsDict = {},
    duplicateArgCounts = {},
    crossReferenceKeyList = [], // [`${curParentName}To${curName}Key`]
    curDepth = 1,
    fromUnion = false,
  ) => {
    const field = gqlSchema.getType(curParentType).getFields()[curName];
    const curTypeName = field.type.toJSON().replace(/[[\]!]/g, '');
    const curType = gqlSchema.getType(curTypeName);
    let queryStr = '';
    let childQuery = '';

    if (curType.getFields) {
      const crossReferenceKey = `${curParentName}To${curName}Key`;
      if (
        (!includeCrossReferences &&
          crossReferenceKeyList.indexOf(crossReferenceKey) !== -1) ||
        (fromUnion ? curDepth - 2 : curDepth) > depthLimit
      ) {
        return '';
      }
      if (!fromUnion) {
        crossReferenceKeyList.push(crossReferenceKey);
      }
      const childKeys = Object.keys(curType.getFields());
      childQuery = childKeys
        .filter((fieldName) => {
          /* Exclude deprecated fields */
          const fieldSchema = gqlSchema.getType(curType).getFields()[fieldName];
          return includeDeprecatedFields || !fieldSchema.deprecationReason;
        })
        .map(
          (cur) =>
            generateQuery(
              cur,
              curType,
              curName,
              argumentsDict,
              duplicateArgCounts,
              crossReferenceKeyList,
              curDepth + 1,
              fromUnion,
            ).queryStr,
        )
        .filter((cur) => Boolean(cur))
        .join('\n');
    }

    if (!(curType.getFields && !childQuery)) {
      queryStr = `${'    '.repeat(curDepth)}${field.name}`;
      if (field.args.length > 0) {
        const dict = getFieldArgsDict(field, duplicateArgCounts, argumentsDict);
        Object.assign(argumentsDict, dict);
        queryStr += `(${getArgsToVarsStr(dict)})`;
      }
      if (childQuery) {
        queryStr += `{\n${childQuery}\n${'    '.repeat(curDepth)}}`;
      }
    }

    /* Union types */
    if (curType.astNode && curType.astNode.kind === 'UnionTypeDefinition') {
      const types = curType.getTypes();
      if (types && types.length) {
        const indent = `${'    '.repeat(curDepth)}`;
        const fragIndent = `${'    '.repeat(curDepth + 1)}`;
        queryStr += '{\n';

        for (let i = 0, len = types.length; i < len; i++) {
          const valueTypeName = types[i];
          const valueType = gqlSchema.getType(valueTypeName);
          const unionChildQuery = Object.keys(valueType.getFields())
            .map(
              (cur) =>
                generateQuery(
                  cur,
                  valueType,
                  curName,
                  argumentsDict,
                  duplicateArgCounts,
                  crossReferenceKeyList,
                  curDepth + 2,
                  true,
                ).queryStr,
            )
            .filter((cur) => Boolean(cur))
            .join('\n');

          /* Exclude empty unions */
          if (unionChildQuery) {
            queryStr += `${fragIndent}... on ${valueTypeName} {\n${unionChildQuery}\n${fragIndent}}\n`;
          }
        }
        queryStr += `${indent}}`;
      }
    }
    return { queryStr, argumentsDict };
  };

  const generateFile = async (obj, description) => {
    let outputFolderName;
    switch (true) {
      case /mutation_root.*$/.test(description):
        outputFolderName = 'mutations';
        break;
      case /query_root.*$/.test(description):
        outputFolderName = 'queries';
        break;
      case /subscription_root.*$/.test(description):
        outputFolderName = 'subscriptions';
        return; // we don't need subscriptions in api
      default:
        console.log.info('[gqlg warning]:', 'description is required');
    }
    const operationsFolder = path.join(destDirPath, `./${outputFolderName}`);

    await fsx.ensureDir(operationsFolder); // operations/[mutations or queries or subscriptions]

    for (const type in obj) {
      // if(type == action) {
      const field = gqlSchema.getType(description).getFields()[type];
      /* Only process non-deprecated queries/mutations: */
      if (includeDeprecatedFields || !field.deprecationReason) {
        const queryResult = generateQuery(type, description);
        const varsToTypesStr = getVarsToTypesStr(queryResult.argumentsDict);
        let query = queryResult.queryStr;
        let queryName = '';
        switch (true) {
          case /mutation_root/.test(description):
            queryName = 'mutation';
            break;
          case /query_root/.test(description):
            queryName = 'query';
            break;
          case /subscription_root/.test(description):
            queryName = 'subscription';
            return; // we don't need subscriptions in api
          default:
            break;
        }

        query = `${queryName || description.toLowerCase()} ${type}${
          varsToTypesStr ? `(${varsToTypesStr})` : ''
        }{\n${query}\n}`;

        await outputFile(
          path.join(operationsFolder, `./${type}.${fileExtension}`),
          query,
        );
      }
    }
  };

  if (gqlSchema.getMutationType()) {
    await generateFile(
      gqlSchema.getMutationType().getFields(),
      gqlSchema.getMutationType().name,
    );
  } else {
    console.log.info(
      '[gqlg warning]:',
      'No mutation type found in your schema',
    );
  }

  if (gqlSchema.getQueryType()) {
    await generateFile(
      gqlSchema.getQueryType().getFields(),
      gqlSchema.getQueryType().name,
    );
  } else {
    console.log.info('[gqlg warning]:', 'No query type found in your schema');
  }
};

const outputFile = async (path, file) => {
  // Almost the same as writeFile (i.e. it overwrites),
  // except that if the parent directory does not exist, it's created.
  // file must be a file path (a buffer or a file descriptor is not allowed).
  const output = await fsx
    .outputFile(path, file)
    .then(() => fsx.readFile(path, 'utf8'))
    .then((_data) => {
      // console.log.info(_data) // => hello!
      return true;
    })
    .catch((err) => {
      console.log.error(err);
      return false;
    });

  return output;
};

generator();
