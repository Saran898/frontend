"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Add_1 = __importDefault(require("./Add")); // Import the Add component from Add.tsx
function Test() {
    // Define a state to store the employees
    const [employees, setEmployees] = (0, react_1.useState)([]);
    // Define a state to control the "isAdding" state
    const [isAdding, setIsAdding] = (0, react_1.useState)(false);
    // Render the Add component and pass the necessary props
    return { /* Render the employees here */};
    {
        employees.map((employee) => key = { employee, : .id } >
            ID, { employee, : .id } < /p>
            < p > Department, { employee, : .deptName } < /p>
            < p > Role, { employee, : .roleName } < /p>
            < p > Inserted, By, { employee, : .inserted_by_name } < /p>
            < /div>);
    }
    { /* Render the Add component */ }
    {
        isAdding ? employees = { employees } : ;
        setEmployees = { setEmployees };
        setIsAdding = { setIsAdding } /  >
        ;
        onClick = {}();
        setIsAdding(true);
    }
     > Add_1.default;
    Employee < /button>;
}
/div>;
;
exports.default = Test;
