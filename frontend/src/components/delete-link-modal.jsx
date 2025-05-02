import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLinkStore } from '@/hooks/useLinkStore';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Loader } from 'lucide-react';
import { useForm } from '@/hooks/useForm';
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useEffect } from 'react';

const formSchema = z
  .object({
    hash: z.string().nonempty('El hash es obligatorio'),
    confirm: z.string().nonempty('Debes confirmar el hash'),
  })
  .refine((data) => data.hash === data.confirm, {
    message: 'Los hashes no coinciden',
    path: ['confirm'],
  });

export const DeleteLinkModal = () => {
  const { loading, activeLink, deleteModalOpen, toggleDeleteModal, removeLink } = useLinkStore();
  const { handleChange, handleSubmit, formData, errors, resetForm } = useForm({
    initialValues: {
      hash: activeLink.hash,
      confirm: '',
    },
    formSchema,
    onSubmit: () => {
      removeLink(formData);
    },
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLink.hash]);

  return (
    <Dialog open={deleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">Borrar /{activeLink.hash}</DialogTitle>
          <DialogDescription className="text-destructive">
            El acceso al link será eliminado permanentemente. Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="confirm" className="text-right text-mono">
              Escribe {activeLink.hash} para confirmar:
            </Label>
            <Input id="confirm" name="confirm" value={formData.confirm} onChange={handleChange} />
            <span className={errors.confirm ? 'text-sm text-destructive' : ''}>{errors.confirm}</span>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} variant="destructive" className="cursor-pointer">
            {loading ? <Loader className="animate-spin" /> : <Trash />}
            Borrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
