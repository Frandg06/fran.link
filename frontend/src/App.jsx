import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource-variable/jetbrains-mono';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Route } from 'wouter';
import { ClerkProvider } from '@clerk/clerk-react';
import { esES } from '@clerk/localizations';
import { SignedIn } from '@clerk/clerk-react';
import { Router } from 'wouter';
import { useTheme } from './hooks/useTheme';
import { dark } from '@clerk/themes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      localization={esES}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: theme === 'dark' ? dark : '',
      }}
    >
      <Router>
        <Route path="/" component={Home} />
        <SignedIn>
          <Route path="/dashboard" component={Dashboard} />
        </SignedIn>
      </Router>
    </ClerkProvider>
  );
}

export default App;
