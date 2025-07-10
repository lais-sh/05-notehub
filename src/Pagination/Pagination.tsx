import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      pageCount={totalPages}
      forcePage={currentPage - 1}
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
