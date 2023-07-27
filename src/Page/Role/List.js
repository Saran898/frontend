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
function List({ handleUpdate, roleFilter, setSelectedEmployee }) {
    const [employees, setEmployees] = (0, react_1.useState)([]);
    const [activeStatus, setActiveStatus] = (0, react_1.useState)({});
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const itemsPerPage = 6; // Number of items to display per page
    // Fetch data and initialize activeStatus on component mount and whenever roleFilter changes
    (0, react_1.useEffect)(() => {
        fetch('http://192.168.11.150:4000/roles')
            .then((response) => response.json())
            .then((data) => {
            setEmployees(data);
            // Set the activeStatus based on the data
            const initialActiveStatus = {};
            data.forEach((employee) => {
                initialActiveStatus[employee.role_id] = employee.is_active_flag;
            });
            setActiveStatus(initialActiveStatus);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, [roleFilter]); // Add roleFilter as a dependency
    const handleToggle = (id) => {
        // Determine the current status of the role
        const currentStatus = activeStatus[id];
        // Determine the new status (active/inactive)
        const newStatus = !currentStatus;
        // Toggle the active status in the local state
        setActiveStatus((prevStatus) => (Object.assign(Object.assign({}, prevStatus), { [id]: !currentStatus })));
        // Make the API call to update the role status
        fetch(`http://192.168.11.150:4000/ract/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_active_flag: newStatus }),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update the role status.');
            }
            // Role status updated successfully, you may want to handle this
        })
            .catch((error) => {
            console.error('Error updating the role status:', error);
            // Revert the local state change if the API call fails
            setActiveStatus((prevStatus) => (Object.assign(Object.assign({}, prevStatus), { [id]: currentStatus })));
        });
    };
    // Get the current page's data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Change page
    const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
    const filteredEmployees = roleFilter === 'All' ? employees : employees.filter((employee) => employee.is_active_flag === (roleFilter === 'true'));
    const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    return (react_1.default.createElement("div", { className: 'contain-table' },
        react_1.default.createElement("table", { className: 'striped-table' },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: 'No' }, "No."),
                    react_1.default.createElement("th", { className: 'Roleid' }, "Role ID"),
                    react_1.default.createElement("th", { className: 'Department' }, "Department"),
                    react_1.default.createElement("th", { className: 'Role' }, "Role"),
                    react_1.default.createElement("th", { colSpan: 2, className: 'text-center' }))),
            react_1.default.createElement("tbody", null, currentEmployees.length > 0 ? (currentEmployees.map((employee, i) => (react_1.default.createElement("tr", { key: employee.role_id },
                react_1.default.createElement("td", { className: 'No1' }, indexOfFirstItem + i + 1),
                react_1.default.createElement("td", { className: 'emproleid' }, employee.role_id),
                react_1.default.createElement("td", { className: 'empdeptname' }, employee.dept_name),
                react_1.default.createElement("td", { className: 'emprolename' }, employee.role_name),
                react_1.default.createElement("td", { className: 'text-right' },
                    react_1.default.createElement("button", { onClick: () => {
                            handleUpdate(employee.role_id);
                            setSelectedEmployee(employee); // Set the selected employee in the Employee component
                        }, className: 'button muted-button', title: 'Edit Role' }, "Edit")),
                react_1.default.createElement("td", { className: 'text-left' },
                    react_1.default.createElement("button", { className: `button ${activeStatus[employee.role_id] ? 'active-button' : 'muted-button'}`, onClick: () => handleToggle(employee.role_id), title: activeStatus[employee.role_id] ? 'Active Role' : 'Inactive Role' }, activeStatus[employee.role_id] ? 'Active' : 'Inactive')))))) : (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 9 }, "No Employees"))))),
        react_1.default.createElement("div", { className: 'pagination' },
            react_1.default.createElement(Pagination_1.default, { onPageChange: onPageChange, totalCount: filteredEmployees.length, siblingCount: 1, currentPage: currentPage, pageSize: itemsPerPage }))));
}
exports.default = List;
