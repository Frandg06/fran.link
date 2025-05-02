import { createLink } from '@/actions/create-link';
import { deleteLink } from '@/actions/delete-link';
import { getLinks } from '@/actions/list-links';
import { toast } from 'sonner';
import { create } from 'zustand';

export const useLinkStore = create((set, get) => ({
  links: [],
  activeLink: null,
  loading: false,
  error: false,
  deleteModalOpen: false,
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
  toggleDeleteModal: () => set((state) => ({ deleteModalOpen: !state.deleteModalOpen })),
  setActiveLink: (hash) => {
    const link = get().links.find((link) => link.hash === hash);
    set({ activeLink: link });
    set({ deleteModalOpen: true });
  },

  removeLink: async (data) => {
    try {
      await deleteLink(data);
      set((state) => ({ links: state.links.filter((link) => link.hash !== data.hash) }));
      set({ deleteModalOpen: false });
      set({ activeLink: null });
      toast.success('Se ha eliminado el enlace correctamente');
    } catch (error) {
      toast.error(error.message);
    }
  },
  clearLinks: () => set({ links: [] }),
}));
