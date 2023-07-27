"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Pagination_1 = __importDefault(require("./Pagination"));
function List({ handleDelete, handleEdit, handleToggle, filteredUsers, setSelectedEmployee }) {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const itemsPerPage = 6; // Number of items to display per page
    // Function to convert ISO 8601 date to desired format (YYYY-MM-DD)
    const convertDateToDisplayFormat = (isoDate) => {
        const dateObj = new Date(isoDate);
        return dateObj.toISOString().split('T')[0]; // Get the first part of the ISO date (YYYY-MM-DD)
    };
    // Get the current page's data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Change page
    const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
    const currentEmployees = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    return (react_1.default.createElement("div", { className: 'contain-table' },
        react_1.default.createElement("table", { className: 'striped-table' },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: 'Empid' }, "Emp ID"),
                    react_1.default.createElement("th", { className: 'Empfname' }, "First Name"),
                    react_1.default.createElement("th", { className: 'Emplname' }, "Last Name"),
                    react_1.default.createElement("th", { className: 'Empemail' }, "Email"),
                    react_1.default.createElement("th", { className: 'Empdob' }, "Date of Join"),
                    react_1.default.createElement("th", { className: 'Empdept' }, "Department"),
                    react_1.default.createElement("th", { className: 'Emprole' }, "Role"),
                    react_1.default.createElement("th", { colSpan: 3, className: 'text-center' }))),
            react_1.default.createElement("tbody", null, currentEmployees.length > 0 ? (currentEmployees.map((employee, i) => (react_1.default.createElement("tr", { key: employee.emp_id },
                react_1.default.createElement("td", { className: 'Empid' }, employee.emp_id),
                react_1.default.createElement("td", { className: 'Empfname' }, employee.firstname),
                react_1.default.createElement("td", { className: 'Emplname' }, employee.lastname),
                react_1.default.createElement("td", { className: 'Empemail' }, employee.email),
                react_1.default.createElement("td", { className: 'Empdob' }, convertDateToDisplayFormat(employee.date_of_join)),
                react_1.default.createElement("td", { className: 'Empdept' }, employee.dept_name),
                react_1.default.createElement("td", { className: 'Emprole' }, employee.role_name),
                react_1.default.createElement("td", { className: 'text-right' },
                    react_1.default.createElement("button", { onClick: () => {
                            handleEdit(employee.emp_id);
                            setSelectedEmployee(employee); // Set the selected employee in the Employee component
                        }, className: 'button muted-button', title: 'Edit Employee' }, "Edit")),
                react_1.default.createElement("td", { className: 'text-right' },
                    react_1.default.createElement("button", { onClick: () => handleDelete(employee.emp_id), className: 'button muted-button', title: 'Delete Employee' }, "Delete")),
                react_1.default.createElement("td", { className: 'text-left' },
                    react_1.default.createElement("button", { className: `button ${employee.is_active_flag ? 'active-button' : 'muted-button'}`, onClick: () => handleToggle(employee.emp_id, !employee.is_active_flag), title: employee.is_active_flag ? 'Active Employee' : 'Inactive Employee' }, employee.is_active_flag ? 'Active' : 'Inactive')))))) : (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 9 }, "No Employees"))))),
        react_1.default.createElement("div", { className: 'pagination' },
            react_1.default.createElement(Pagination_1.default, { onPageChange: onPageChange, totalCount: filteredUsers.length, siblingCount: 1, currentPage: currentPage, pageSize: itemsPerPage }))));
}
exports.default = List;
