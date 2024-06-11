"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink
} from "@apollo/experimental-nextjs-app-support";
import { setVerbosity } from "ts-invariant";

// setVerbosity("debug");

function makeClient() {
  const httpLink = new HttpLink({
    // TODO: Can move to .env
    uri: "http://localhost:3002/graphql",
    fetchOptions: { cache: "no-store" }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            httpLink
          ])
        : httpLink
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloNextAppProvider>
  );
}
