import { Link } from 'lucide-react';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource-variable/jetbrains-mono';
import { Github } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { Input } from './components/ui/input';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Copy } from 'lucide-react';
import { Trash } from 'lucide-react';
import { format } from './lib/format';
import { Button } from './components/ui/button';
import { Package } from 'lucide-react';
import { CreateLink } from './components/create-link';
import { useLinkStore } from './hooks/useLinkStore';
import { useMemo } from 'react';
import { useState } from 'react';

function App() {
  const toggleTheme = useTheme();
  const [search, setSearch] = useState('');

  const { getLinks, links } = useLinkStore();

  const searcheableLinks = useMemo(() => {
    return links.filter((link) => {
      const searchLower = search.toLowerCase();
      return link.hash.toLowerCase().includes(searchLower) || link.destination.toLowerCase().includes(searchLower);
    });
  }, [search, links]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <>
      <header className="flex items-center justify-between max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-2 font-mono">
          <Link className="bg-gradient-to-tl from-black to-neutral-700 p-2 size-8 rounded-md text-white" />
          frandg.link
        </div>
        <div className="flex items-center gap-4">
          <a>
            <Github className="size-5" />
          </a>
          <button onClick={toggleTheme}>
            <Sun className="hidden dark:block size-5" />
            <Moon className="dark:hidden block size-5" />
          </button>
        </div>
      </header>
      <nav className="border-b">
        <ul className="max-w-7xl mx-auto flex items-center gap-4 px-6">
          <li className="flex items-center gap-2 w-fit border-b px-1 py-4 active">
            <Link className="size-5 rotate-45" />
            Links
          </li>
        </ul>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-6">
        <section className="flex items-center justify-between">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Buscar link..."
              className="w-42 md:w-72 rounded-sm pl-7"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-2 size-4 text-muted-foreground" />
          </div>
          <div>
            <Button variant="outline" className="rounded-sm bg-background" size="sm">
              <Package className="size-4" />
              {links.length}
            </Button>
            <CreateLink />
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {searcheableLinks?.map((link) => (
            <article key={link.hash} className="border rounded-sm p-4 flex flex-col gap-4 justify-between">
              <div className="flex items-center justify-between gap-4">
                <a
                  className="block hover:text-muted-foreground"
                  href={`https://frandg.link/${link.hash}`}
                  target="_blank"
                >
                  <span className="text-muted-foreground text-">/</span>
                  {link.hash}
                </a>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-end font-mono gap-0.5">
                    <ChartNoAxesColumnIncreasing className="size-5" /> {link.clicks} clicks
                  </span>
                  <span className="block w-[1px] h-4 bg-muted-foreground" />
                  <Copy className="size-4" />
                  <Trash className="size-4" />
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 font-mono text-muted-foreground mt-4 text-sm">
                <a
                  className="block hover:underline flex-1 truncate"
                  href={`https://frandg.link/${link.hash}`}
                  target="_blank"
                >
                  {link.destination}
                </a>
                <span className="block ">{format(new Date(link.createdAt), 'es', { dateStyle: 'long' })}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
