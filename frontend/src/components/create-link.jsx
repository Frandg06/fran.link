import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@/hooks/useForm';
import { useLinkStore } from '@/hooks/useLinkStore';
import { Loader } from 'lucide-react';
import { Rocket } from 'lucide-react';
import { Shuffle } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  destination: z.string().nonempty('El destino es obligatorio').url('Debe ser una URL válida'),
  hash: z.string().min(2, 'El hash debe tener exactamente 4 caracteres'),
  authToken: z.string().nonempty('El token es obligatorio'),
});

export function CreateLink() {
  const { addLink, loading } = useLinkStore();
  const [open, setOpen] = useState(false);
  const { handleChange, formData, errors, handleSubmit, resetForm } = useForm({
    onSubmit: async () => {
      const res = await addLink(formData);
      if (res?.error) return;
      resetForm();
      setOpen(false);
    },
    formSchema,
    initialValues: {
      destination: '',
      hash: '',
      authToken: '',
    },
  });

  const handleRandom = () => {
    const newHash = Math.random().toString(36).slice(2, 10);
    handleChange({
      target: { name: 'hash', value: newHash },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-sm dark:bg-neutral-700 dark:text-white ml-2 md:ml-4 font-mono text-xs dark:hover:bg-neutral-900 hover:bg-neutral-700 cursor-pointer"
          size="sm"
        >
          <Plus />
          <span className="md:block hidden">Nuevo link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono">Nuevo Link</DialogTitle>
          <DialogDescription>
            Crea un nuevo enlace acortado desde aquí. Clicka crear cuando lo tengas listo.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="destination" className="text-right">
              URL de destino
            </Label>
            <Input
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="https://"
            />
            <span className={errors.destination ? 'text-sm text-destructive' : ''}>{errors.destination}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hash" className="text-right">
              Hash
            </Label>
            <div className="flex items-center">
              <Input
                id="hash"
                className="rounded-r-none"
                name="hash"
                value={formData.hash}
                onChange={handleChange}
                placeholder="94bndv2p"
              />
              <Button variant="outline" className="rounded-l-none" onClick={handleRandom} type="button">
                <Shuffle />
                Aleatorio
              </Button>
            </div>
            <span className={errors.hash ? 'text-sm text-destructive' : ''}>{errors.hash}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="authToken" className="text-right">
              Auth Token
            </Label>
            <Input id="authToken" name="authToken" value={formData.authToken} onChange={handleChange} />
            <span className={errors.authToken ? 'text-sm text-destructive' : ''}>{errors.authToken}</span>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {loading ? <Loader className="animate-spin" /> : <Rocket />}
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
