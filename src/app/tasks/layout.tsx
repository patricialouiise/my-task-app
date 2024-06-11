import { ApolloWrapper } from "../helpers/ApolloWrapper";
export default function Layout({ children }: React.PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
