'use client'

import { SWRConfig } from 'swr'

export const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}
