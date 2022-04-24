import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/andrei-kozel/blog",
  cache: new InMemoryCache(),
});

export default client;
