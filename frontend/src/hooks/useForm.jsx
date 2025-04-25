import { useState } from 'react';
import { z } from 'zod';
const formSchema = z.object({
  destination: z.string().nonempty('El destino es obligatorio').url('Debe ser una URL válida'),
  hash: z.string().min(4, 'El hash debe tener exactamente 4 caracteres'),
  authToken: z.string().nonempty('El token es obligatorio'),
});

const validate = (data) => formSchema.safeParse(data);
export const useForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for the field being changed

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const validator = validate(formData);

    if (!validator.success) {
      const fieldErrors = validator.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      return;
    }

    onSubmit();
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors([]);
  };

  return { formData, handleChange, errors, setErrors, onHandleSubmit, resetForm };
};
