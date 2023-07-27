import { useMemo } from 'react';
<<<<<<< HEAD
export const DOTS = '...';
=======

export const DOTS = '...';

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
<<<<<<< HEAD
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
=======

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
<<<<<<< HEAD
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
=======

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
<<<<<<< HEAD
=======

>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
  return paginationRange;
};