import { useId } from "react";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import type { NewNoteData } from "../../types/note";
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),

  content: Yup.string().max(500, "Maximum 500 characters"),

  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const formId = useId();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (values: NewNoteData, actions: any) => {
    mutate(values);
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        {/* Title field */}
        <div className={css.group}>
          <label htmlFor={`${formId}-title`}>Title</label>
          <Field
            id={`${formId}-title`}
            name="title"
            type="text"
            className={css.field}
          />
          <FormikError name="title" component="span" className={css.validation} />
        </div>

        {/* Content textarea */}
        <div className={css.group}>
          <label htmlFor={`${formId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${formId}-content`}
            name="content"
            rows={6}
            className={css.text}
          />
          <FormikError name="content" component="span" className={css.validation} />
        </div>

        {/* Tag dropdown */}
        <div className={css.group}>
          <label htmlFor={`${formId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${formId}-tag`}
            name="tag"
            className={css.dropdown}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikError name="tag" component="span" className={css.validation} />
        </div>

        {/* Action buttons */}
        <div className={css.controls}>
          <button
            type="button"
            className={css.secondaryBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className={css.primaryBtn}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
