import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import schema from './schema'
import { createContext } from './context'

const PORT = 4000
async function startApolloServer() {
  const server = new ApolloServer({
    context: (e) => createContext(e),
    schema,
  })
  const app = express();
  await server.start();
  server.applyMiddleware({app, path: '/graphql'});
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  })
}
startApolloServer()
