// Pagination.js
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './Pagination.css'; // You may update the path to your pagination style file.
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
<<<<<<< HEAD
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
=======

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
export default Pagination;
