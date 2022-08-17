import { useState } from 'react';
import superjson from 'superjson';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Test } from './components/Test';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3001/trpc',
      transformer: superjson,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Test />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
