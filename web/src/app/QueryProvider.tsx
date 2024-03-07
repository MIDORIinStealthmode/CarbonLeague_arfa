'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryProvider = new QueryClient()

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryProvider}>
      {children}
    </QueryClientProvider>
  )
}
