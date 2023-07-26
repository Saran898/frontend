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
function Add({ employees, setEmployees, setIsAdding }) {
    const [roleName, setRoleName] = (0, react_1.useState)('');
    const [deptName, setDeptName] = (0, react_1.useState)('');
    const [departments, setDepartments] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetch('http://192.168.11.150:4000/roles')
            .then((response) => response.json())
            .then((data) => {
            const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
            setDepartments(uniqueDepartments);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const handleAdd = (e) => {
        e.preventDefault();
        if (!deptName || !roleName) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        const newRole = {
            dept_name: deptName,
            role_name: roleName,
        };
        fetch('http://192.168.11.150:4000/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRole),
        })
            .then((response) => response.json())
            .then((data) => {
            const id = employees.length + 1;
            const newEmployee = {
                id,
                deptName: data.dept_name,
                roleName: data.role_name,
                inserted_by_name: 'Naga',
            };
            setEmployees([...employees, newEmployee]);
            setIsAdding(false);
            sweetalert2_1.default.fire({
                icon: 'success',
                title: 'Added!',
                text: `${roleName}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500,
            });
        })
            .catch((error) => {
            console.error('Error adding new employee role:', error);
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add new employee role.',
                showConfirmButton: true,
            });
        });
    };
    return (<div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Role</h1>
        <label htmlFor="firstName">Department</label>
        <select id="deptName" name="deptName" value={deptName} onChange={(e) => setDeptName(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((role) => (<option key={role} value={role}>
              {role}
            </option>))}
        </select>
        <label htmlFor="roleName">Role</label>
        <input id="roleName" type="text" name="roleName" value={roleName} onChange={(e) => setRoleName(e.target.value)}/>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add"/>
          <input style={{ marginLeft: '12px' }} className="muted-button" type="button" value="Cancel" onClick={() => setIsAdding(false)}/>
        </div>
      </form>
    </div>);
}
exports.default = Add;
