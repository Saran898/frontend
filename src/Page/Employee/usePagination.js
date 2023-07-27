"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = exports.DOTS = void 0;
const react_1 = require("react");
exports.DOTS = '...';
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};
const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage, }) => {
    const paginationRange = (0, react_1.useMemo)(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;
        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        /*
          We do not want to show dots if there is only one position left
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, exports.DOTS, totalPageCount];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, exports.DOTS, ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, exports.DOTS, ...middleRange, exports.DOTS, lastPageIndex];
        }
        // This is needed for TypeScript, but it should never happen
        return [];
    }, [totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
};
exports.usePagination = usePagination;
