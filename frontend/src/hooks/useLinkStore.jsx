import { createLink } from '@/actions/create-link';
import { getLinks } from '@/actions/list-links';
import React from 'react';
import { toast } from 'sonner';
import { create } from 'zustand';

export const useLinkStore = create((set) => ({
  links: [],
  loading: false,
  error: false,
  getLinks: async () => {
    try {
      set({ loading: true });
      const response = await getLinks();
      set({ links: response });
    } catch (error) {
      set({ links: [] });
      toast.error(error?.error_message ?? 'Se ha producido un error creando el enlace, Inténtalo de nuevo');
      console.error('Error fetching links:', error);
      return { error: true };
    } finally {
      set({ loading: false });
    }
  },
  addLink: async (link) => {
    set({ loading: true });
    try {
      const response = await createLink(link);
      set((state) => ({ links: [...state.links, response] }));
      toast.success('Se ha creado el enlace correctamente');
    } catch (error) {
      toast.error(error.message);
      return { error: true };
    } finally {
      set({ loading: false });
    }
  },
  removeLink: (link) => set((state) => ({ links: state.links.filter((l) => l !== link) })),
  clearLinks: () => set({ links: [] }),
}));
