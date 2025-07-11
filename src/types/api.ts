import type { Note } from './note';

export interface FetchNotesResponse {
  results: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
}
