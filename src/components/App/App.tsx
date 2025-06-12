import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchNotes } from "../../services/noteService";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      {isLoading && <Loader />}

      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onSearch={setSearchTerm} />
        {data && data.totalPages > 1 && (
         <Pagination
           totalPages={data.totalPages}
           currentPage={page}
           onPageChange={setPage}
         />
        )}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isError && <ErrorMessage />}

      {data?.notes && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <NoteModal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose} />
        </NoteModal>
      )}
    </div>
  );
}
