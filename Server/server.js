require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/database/db");
const config = require("./src/config/config");
const initSocket = require("./src/socket/socket.io");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const { typeDefs } = require("./src/utils/graphql/typeDefs");
const authMiddleware = require("./src/middleware/auth.middleware");
const { getUserStats } = require("./src/utils/graphql/resolver");

const server = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      getUserStats: getUserStats,
    },
  },
});

connectDB().then(async () => {
  await apolloServer.start();
  app.use("/graphql", authMiddleware, expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ user: req.user })
  }));

  server.listen(config.PORT, () => {
    console.log("Server is connected");
  });
  initSocket(server);
});
