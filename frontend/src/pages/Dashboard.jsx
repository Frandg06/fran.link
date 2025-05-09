import React from 'react';
import { Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Copy } from 'lucide-react';
import { Trash } from 'lucide-react';
import { format } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { CreateLink } from '@/components/create-link';
import { useLinkStore } from '@/hooks/useLinkStore';
import { useMemo } from 'react';
import { useState } from 'react';
import { DeleteLinkModal } from '@/components/delete-link-modal';
import { toast } from 'sonner';
import { WORKER_URL } from '@/lib/config';
import Layout from '@/components/layout';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
  const [search, setSearch] = useState('');

  const { getToken } = useAuth();

  const { getLinks, links, setActiveLink, activeLink } = useLinkStore();

  const searcheableLinks = useMemo(() => {
    return links.filter((link) => {
      const searchLower = search.toLowerCase();
      return link.hash.toLowerCase().includes(searchLower) || link.destination.toLowerCase().includes(searchLower);
    });
  }, [search, links]);

  const copyToClipboard = (hash) => {
    navigator.clipboard.writeText(`https://frandg.link/${hash}`);
    toast.success('Enlace copiado al portapapeles');
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      localStorage.setItem('bearerToken', token);
      await getLinks();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
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
                <a className="block hover:text-muted-foreground" href={`${WORKER_URL}/${link.hash}`} target="_blank">
                  <span className="text-muted-foreground text-">/</span>
                  {link.hash}
                </a>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-end font-mono gap-0.5">
                    <ChartNoAxesColumnIncreasing className="size-5" /> {link.clicks} clicks
                  </span>
                  <span className="block w-[1px] h-4 bg-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(link.hash)}
                    className="hover:text-muted-foreground cursor-pointer"
                  >
                    <Copy className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLink(link.hash)}
                    className="hover:text-muted-foreground cursor-pointer"
                  >
                    <Trash className="size-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 font-mono text-muted-foreground mt-4 text-sm">
                <a
                  className="block hover:underline flex-1 truncate"
                  href={`${WORKER_URL}/${link.hash}`}
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
      {activeLink && <DeleteLinkModal />}
    </Layout>
  );
};

export default Dashboard;
