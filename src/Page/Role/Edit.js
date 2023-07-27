<<<<<<< HEAD
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
const sweetalert2_1 = __importDefault(require("sweetalert2"));
function Edit({ selectedEmployee, setEmployees, setIsEditing }) {
    const id = selectedEmployee.role_id; // Use role_id from the selectedEmployee object
    (0, react_1.useEffect)(() => {
        fetch('http://192.168.11.150:4000/roles')
            .then((response) => response.json())
            .then((data) => {
            // Set the data from the API to the state
            const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
            // Set the unique department names to the state
            setDepartments(uniqueDepartments);
            // Set the selectedEmployee data to initialize the state
            setRoleName(selectedEmployee.role_name);
            setDeptName(selectedEmployee.dept_name);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, [selectedEmployee]);
    (0, react_1.useEffect)(() => {
        fetch(`http://192.168.11.150:4000/roles/${id}`)
            .then((response) => response.json())
            .then((data) => {
            // Set the data from the API to the state
            setRoleName(data.role_name);
            setDeptName(data.dept_name);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);
    const [departments, setDepartments] = (0, react_1.useState)([]);
    const [roleName, setRoleName] = (0, react_1.useState)('');
    const [deptName, setDeptName] = (0, react_1.useState)('');
    const handleEdit = (e) => {
        e.preventDefault();
        if (!roleName || !deptName) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        const updatedRole = {
            role_name: roleName,
            dept_name: deptName,
        };
        // Send the updated role data to the server using fetch
        fetch(`http://192.168.11.150:4000/roles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRole),
        })
            .then((response) => response.json())
            .then((data) => {
            // Assuming you have a function to update the selectedEmployee in the parent component
            setEmployees((prevEmployees) => {
                // Find the selected employee and update it in the employees array
                const updatedEmployees = prevEmployees.map((employee) => employee.role_id === id ? Object.assign(Object.assign({}, employee), updatedRole) : employee);
                return updatedEmployees;
            });
            // Close the editing mode
            setIsEditing(false);
            // Show success message
            sweetalert2_1.default.fire({
                icon: 'success',
                title: 'Updated!',
                text: `Role data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
            });
        })
            .catch((error) => {
            console.error('Error updating role:', error);
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update role.',
                showConfirmButton: true,
            });
        });
    };
    return (react_1.default.createElement("div", { className: "small-container" },
        react_1.default.createElement("form", { onSubmit: handleEdit },
            react_1.default.createElement("h1", null, "Edit Role"),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "Department"),
            react_1.default.createElement("select", { id: "deptName", name: "deptName", value: deptName, onChange: (e) => setDeptName(e.target.value) },
                react_1.default.createElement("option", { value: "" }, "Select Department"),
                departments.map((department) => (react_1.default.createElement("option", { key: department, value: department }, department)))),
            react_1.default.createElement("label", { htmlFor: "roleName" }, "Role"),
            react_1.default.createElement("input", { id: "roleName", type: "text", name: "roleName", value: roleName, onChange: (e) => setRoleName(e.target.value) }),
            react_1.default.createElement("div", { style: { marginTop: '30px' } },
                react_1.default.createElement("input", { type: "submit", value: "Update" }),
                react_1.default.createElement("input", { style: { marginLeft: '12px' }, className: "muted-button", type: "button", value: "Cancel", onClick: () => setIsEditing(false) })))));
}
exports.default = Edit;
=======
>>>>>>> 630207be6bf5271ab274ac6d7c1a82b2014fa928
