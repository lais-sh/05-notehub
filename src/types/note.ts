// Доступні теги для нотаток
export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

// Тип однієї нотатки, отриманої з сервера
export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

// Тип нової нотатки при створенні
export interface NewNoteData {
  title: string;
  content: string;
  tag: Tag;
}
