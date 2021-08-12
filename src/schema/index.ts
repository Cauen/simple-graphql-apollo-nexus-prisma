import * as NexusSchema from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as path from 'path'
import * as types from './types'
import { ApolloError } from 'apollo-server-express';

export default NexusSchema.makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
    NexusSchema.fieldAuthorizePlugin({
      formatError: (({ error }) => 
        new ApolloError(error.message, '10')
      )
    })
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
