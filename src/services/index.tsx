import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlService = new ApolloClient({
  uri: import.meta.env.VITE_API_URL_GRAPHQL,
  cache: new InMemoryCache(),
});

export { graphqlService };
