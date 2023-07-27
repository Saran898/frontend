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
const axios_1 = __importDefault(require("axios"));
const initialState = {
    departments: [],
    roleName: '',
    deptName: '',
};
function reducer(state, action) {
    switch (action.type) {
        case 'SET_DEPARTMENTS':
            return Object.assign(Object.assign({}, state), { departments: action.payload });
        case 'SET_ROLE_NAME':
            return Object.assign(Object.assign({}, state), { roleName: action.payload });
        case 'SET_DEPT_NAME':
            return Object.assign(Object.assign({}, state), { deptName: action.payload });
        default:
            return state;
    }
}
function Edit({ selectedEmployee, setEmployees, setIsEditing }) {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const initialSelectedEmployeeRef = (0, react_1.useRef)(selectedEmployee);
    (0, react_1.useEffect)(() => {
        const initialSelectedEmployee = initialSelectedEmployeeRef.current;
        axios_1.default
            .get('http://192.168.11.150:4000/roles')
            .then((response) => {
            const data = response.data;
            // Set the data from the API to the state
            const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
            // Set the unique department names to the state
            dispatch({ type: 'SET_DEPARTMENTS', payload: uniqueDepartments });
            // Set the selectedEmployee data to initialize the state
            dispatch({ type: 'SET_ROLE_NAME', payload: initialSelectedEmployee.role_name });
            dispatch({ type: 'SET_DEPT_NAME', payload: initialSelectedEmployee.dept_name });
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const handleEdit = (e) => {
        e.preventDefault();
        const { roleName, deptName } = state;
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
        // Send the updated role data to the server using axios
        axios_1.default
            .put(`http://192.168.11.150:4000/roles/${selectedEmployee.role_id}`, updatedRole, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
            // Assuming you have a function to update the selectedEmployee in the parent component
            setEmployees((prevEmployees) => {
                // Find the selected employee and update it in the employees array
                const updatedEmployees = prevEmployees.map((employee) => employee.role_id === selectedEmployee.role_id ? Object.assign(Object.assign({}, employee), updatedRole) : employee);
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
    const { departments, roleName, deptName } = state;
    return (react_1.default.createElement("div", { className: "small-container" },
        react_1.default.createElement("form", { onSubmit: handleEdit },
            react_1.default.createElement("h1", null, "Edit Role"),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "Department"),
            react_1.default.createElement("select", { id: "deptName", name: "deptName", value: deptName, onChange: (e) => dispatch({ type: 'SET_DEPT_NAME', payload: e.target.value }) },
                react_1.default.createElement("option", { value: "" }, "Select Department"),
                departments.map((department) => (react_1.default.createElement("option", { key: department, value: department }, department)))),
            react_1.default.createElement("label", { htmlFor: "roleName" }, "Role"),
            react_1.default.createElement("input", { id: "roleName", type: "text", name: "roleName", value: roleName, onChange: (e) => dispatch({ type: 'SET_ROLE_NAME', payload: e.target.value }) }),
            react_1.default.createElement("div", { style: { marginTop: '30px' } },
                react_1.default.createElement("input", { type: "submit", value: "Update" }),
                react_1.default.createElement("input", { style: { marginLeft: '12px' }, className: "muted-button", type: "button", value: "Cancel", onClick: () => setIsEditing(false) })))));
}
exports.default = Edit;
