"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const usePagination_1 = require("./usePagination");
require("./Pagination.css"); // You may update the path to your pagination style file.
const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className, } = props;
    const paginationRange = (0, usePagination_1.usePagination)({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    };
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    let lastPage = paginationRange[paginationRange.length - 1];
    return (react_1.default.createElement("ul", { className: (0, classnames_1.default)('pagination-container', { [className || '']: !!className }) },
        react_1.default.createElement("li", { className: (0, classnames_1.default)('pagination-item', {
                disabled: currentPage === 1,
            }), onClick: onPrevious },
            react_1.default.createElement("div", { className: "arrow left" })),
        paginationRange.map((pageNumber, index) => {
            if (pageNumber === usePagination_1.DOTS) {
                return (react_1.default.createElement("li", { key: `dots-${index}`, className: "pagination-item dots" }, "\u2026"));
            }
            return (react_1.default.createElement("li", { key: pageNumber, className: (0, classnames_1.default)('pagination-item', {
                    selected: pageNumber === currentPage,
                }), onClick: () => onPageChange(pageNumber) }, pageNumber));
        }),
        react_1.default.createElement("li", { className: (0, classnames_1.default)('pagination-item', {
                disabled: currentPage === lastPage,
            }), onClick: onNext },
            react_1.default.createElement("div", { className: "arrow right" }))));
};
exports.default = Pagination;
