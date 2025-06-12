import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.container}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.card}>
          <div className={css.header}>
            <h3 className={css.heading}>{title}</h3>
          </div>
          <p className={css.body}>{content}</p>
          <div className={css.actions}>
            <span className={css.label}>{tag}</span>
            <button
              onClick={() => mutate(id)}
              className={css.deleteBtn}
              type="button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
