import '../styles/globals.css';

import { queryClient } from '@components/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';


import type { AppProps } from 'next/app'
// Create a client


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-ts-portal="overlay-container" className='pointer-events-none fixed left-0 top-0 bottom-0 right-0 z-10' />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
