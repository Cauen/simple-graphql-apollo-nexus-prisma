import * as NexusSchema from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as path from 'path'
import * as cases from './cases'
import { ApolloError } from 'apollo-server-express';
import { validatePlugin } from 'nexus-validate';

export default NexusSchema.makeSchema({
  types: cases,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
    NexusSchema.fieldAuthorizePlugin({
      formatError: (({ error }) => 
        new ApolloError(error.message, '10')
      )
    }),
    validatePlugin(),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
})
