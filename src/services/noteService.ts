import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';
import type { FetchNotesResponse } from '../types/api';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const AUTH_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

console.log('🔐 Loaded token from .env:', AUTH_TOKEN);

if (!AUTH_TOKEN) {
  console.warn('⚠️ Missing environment token: VITE_NOTEHUB_TOKEN. Check your .env file and restart Vite!');
}

const config = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export async function fetchNotes(params: {
  page: number;
  search?: string;
  perPage?: number;
}): Promise<FetchNotesResponse> {
  const { page, search = '', perPage = 12 } = params;

  try {
    const response = await axios.get<FetchNotesResponse>(API_URL, {
      headers: config.headers,
      params: { page, perPage, ...(search && { search }) },
    });
    console.log('📥 Notes fetched:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('🚨 Failed to load notes:', err?.response?.data || err.message);
    throw err;
  }
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  try {
    const response = await axios.post<Note>(API_URL, noteData, config);
    console.log('✅ Note created:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('🚨 Failed to create note:', err?.response?.data || err.message);
    throw err;
  }
}

export async function deleteNote(noteId: string): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${API_URL}/${noteId}`, config);
    console.log('🗑️ Note deleted:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('🚨 Failed to delete note:', err?.response?.data || err.message);
    throw err;
  }
}
