'use client'

import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  ProfilesClientProvider,
} from '@futureverse/asset-register-react/profiles'
import { ProfileComponent } from '../components/profile'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfilesClientProvider
      url={`https://ar-api.futureverse.cloud/graphql`}
      authorizationToken={async () => {
        return Promise.resolve('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') // Add your authorization token here
      }}
    >
      <ProfileComponent />
    </ProfilesClientProvider>
    </QueryClientProvider>
  );
}
