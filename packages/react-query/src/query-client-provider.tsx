import React from "react";

export class QueryClient {
  private keys: Record<string, "valid" | "invalid"> = {};
  constructor() {}
}

export const QueryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
);

type QueryClientProviderProps = {
  client: QueryClient;
  children: React.ReactNode;
};

export function QueryClientProvider({
  client,
  children,
}: QueryClientProviderProps) {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
}

export function useQueryClient() {
  const context = React.useContext(QueryClientContext);

  if (context === undefined) {
    throw Error("Query Client can only be used.");
  }

  return context;
}
