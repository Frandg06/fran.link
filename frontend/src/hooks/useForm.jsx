import { useState } from 'react';

const validate = (data, formSchema) => formSchema.safeParse(data);

export const useForm = ({ initialValues, onSubmit, formSchema }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for the field being changed

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    if (formSchema) {
      const validator = validate(formData, formSchema);

      if (!validator.success) {
        const fieldErrors = validator.error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
        return;
      }
    }

    onSubmit();
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors([]);
  };

  return { formData, handleChange, errors, setErrors, handleSubmit, resetForm };
};
