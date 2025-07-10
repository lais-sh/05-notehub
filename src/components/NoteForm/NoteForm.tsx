import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikError,
} from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../services/noteService';
import type { NewNoteData } from '../../types/note';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required'),
  content: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

const initialValues: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (
    values: NewNoteData,
    helpers: FormikHelpers<NewNoteData>
  ) => {
    mutate(values);
    helpers.resetForm();
  };

  return (
    <div className={css.formContainer}>
      <h2>Create a New Note</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label>
            Title
            <Field name="title" className={css.input} />
            <FormikError name="title" component="div" className={css.error} />
          </label>

          <label>
            Content
            <Field
              as="textarea"
              name="content"
              rows={4}
              className={css.textarea}
            />
            <FormikError name="content" component="div" className={css.error} />
          </label>

          <label>
            Tag
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <FormikError name="tag" component="div" className={css.error} />
          </label>

          <div className={css.buttons}>
            <button type="submit" className={css.submit}>
              Save
            </button>
            <button type="button" onClick={onClose} className={css.cancel}>
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
