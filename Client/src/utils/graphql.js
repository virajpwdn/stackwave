import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import useToken from "../lib/hooks/useToken";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql",
});

const authLink = new SetContextLink((prevContext) => {
  const token = useToken();
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? "Bearer " + token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
