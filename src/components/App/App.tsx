import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';

import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Common/Loader';
import ErrorMessage from '../Common/ErrorMessage';
import Pagination from '../../Pagination/Pagination';

import { fetchNotes } from '../../services/noteService';
import useDebounce from '../../hooks/useDebounce';
import type { FetchNotesResponse } from '../../types/note';

import css from './App.module.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    isPending,
    isError,
  } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (Array.isArray(data?.results) && data.results.length === 0) {
      toast('No notes found.', { icon: '📝' });
    }
  }, [data]);

  const handleSearch = (newSearch: string) => {
    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <Toaster />

      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isPending && <Loader />}
      {isError && <ErrorMessage />}

      {Array.isArray(data?.results) && data.results.length > 0 && (
        <NoteList notes={data.results} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
