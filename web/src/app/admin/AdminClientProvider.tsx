'use client'

import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const AdminClientProvider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}
