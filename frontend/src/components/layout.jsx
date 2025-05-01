import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Link } from 'lucide-react';
import { Github } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <header className="flex items-center justify-between max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-2 font-mono">
          <Link className="bg-gradient-to-tl from-black to-neutral-700 p-2 size-8 rounded-md text-white" />
          frandg.link
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Frandg06/fran.link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground"
          >
            <Github className="size-5" />
          </a>
          <button onClick={toggleTheme} className="cursor-pointer">
            <Sun className="hidden dark:block size-5" />
            <Moon className="dark:hidden block size-5" />
          </button>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button>
                Empieza aquí
                <ArrowRight className="size-5" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
