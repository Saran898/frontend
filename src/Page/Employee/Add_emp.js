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
const date_fns_1 = require("date-fns");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const axios_1 = __importDefault(require("axios"));
require("./Add_emp.css");
const namePattern = /^[a-zA-Z]+$/;
const addressPattern = /^[a-zA-Z0-9\s,.:/\\-]+$/;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 25;
const emailPattern = /^(?![-_.])[a-zA-Z0-9_%+-]+(?!\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function Add({ setIsAdding }) {
    const [firstName, setFirstName] = (0, react_1.useState)('');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [gender, setGender] = (0, react_1.useState)(''); // Updated to radio buttons
    const [address, setAddress] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [mobileNo, setMobileNo] = (0, react_1.useState)('');
    const [age, setAge] = (0, react_1.useState)('18'); // Age can be a string or a number
    const [date, setDate] = (0, react_1.useState)('');
    const [deptName, setDeptName] = (0, react_1.useState)(''); // Dropdown for department name
    const [roleName, setRoleName] = (0, react_1.useState)(''); // Dropdown for role name
    const [departments, setDepartments] = (0, react_1.useState)([]);
    const [roles, setRoles] = (0, react_1.useState)([]);
    const textInput = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get('http://192.168.11.150:4000/employees')
            .then((response) => response.data)
            .then((data) => {
            // Handle the API response and update the departments and roles state
            const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
            setDepartments(uniqueDepartments);
            const uniqueRoles = [...new Set(data.map((role) => role.role_name))];
            setRoles(uniqueRoles);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const handleAdd = (e) => {
        e.preventDefault();
        let hasError = false;
        if (!firstName || !namePattern.test(firstName) || firstName.length < MIN_NAME_LENGTH || firstName.length > MAX_NAME_LENGTH) {
            setFirstName('');
            hasError = true;
        }
        if (!lastName || !namePattern.test(lastName) || lastName.length < MIN_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
            setLastName('');
            hasError = true;
        }
        // Other validations as before
        if (!gender || !address || !email || !mobileNo || !age || !date || !deptName || !roleName) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        if (hasError) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'First name and last name should not contain special characters.',
                showConfirmButton: true,
            });
        }
        if (!emailPattern.test(email)) {
            setEmail('');
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid email address format.',
                showConfirmButton: true,
            });
        }
        // Validate mobile number and age
        if (isNaN(Number(mobileNo)) || isNaN(Number(age))) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Mobile number and age must be valid numbers.',
                showConfirmButton: true,
            });
        }
        // Validate mobile number length
        if (mobileNo.length !== 10) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Mobile number must be 10 digits long.',
                showConfirmButton: true,
            });
        }
        // Disallow mobile number with all zeros
        if (/^0+$/.test(mobileNo)) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Mobile number cannot be all zeros.',
                showConfirmButton: true,
            });
        }
        // Validate age range (between 18 and 70)
        if (Number(age) < 18 || Number(age) > 70) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Age must be between 18 and 70.',
                showConfirmButton: true,
            });
        }
        // Add the new employee data
        const newEmployee = {
            firstname: firstName,
            lastname: lastName,
            gender: gender,
            address: address,
            email: email,
            mobile_no: parseInt(mobileNo, 10),
            age: parseInt(age, 10),
            date_of_join: new Date(date).toISOString(),
            dept_name: deptName,
            role_name: roleName,
        };
        // Send the data to the server using fetch
        fetch('http://192.168.11.150:4000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        })
            .then((response) => response.json())
            .then((data) => {
            // Handle the response from the API and show success message
            setIsAdding(false);
            sweetalert2_1.default.fire({
                icon: 'success',
                title: 'Added!',
                text: `${firstName} ${lastName}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500,
            });
        })
            .catch((error) => {
            // Handle errors from the API request
            console.error('Error adding new employee:', error);
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add new employee.',
                showConfirmButton: true,
            });
        });
    };
    // Function to handle entering only numbers for mobile number
    const handleMobileNoChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setMobileNo(numericValue);
    };
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // Subtract 3 months from the current date
    return (react_1.default.createElement("div", { className: "small-container" },
        react_1.default.createElement("form", { onSubmit: handleAdd },
            react_1.default.createElement("h1", null, "Add Employee"),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "First Name"),
            react_1.default.createElement("input", { id: "firstName", type: "text", ref: textInput, name: "firstName", value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Enter First Name" }),
            firstName && !namePattern.test(firstName) && (react_1.default.createElement("span", { style: { color: 'red' } }, "First name should not contain special characters.")),
            react_1.default.createElement("label", { htmlFor: "lastName" }, "Last Name"),
            react_1.default.createElement("input", { id: "lastName", type: "text", name: "lastName", value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Enter Last Name" }),
            lastName && !namePattern.test(lastName) && (react_1.default.createElement("span", { style: { color: 'red' } }, "Last name should not contain special characters.")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Gender"),
                react_1.default.createElement("div", { className: "gender" },
                    react_1.default.createElement("div", { className: "female" },
                        react_1.default.createElement("input", { type: "radio", name: "gender", value: "Female", checked: gender === 'Female', onChange: () => setGender('Female') }),
                        ' ',
                        "Female"),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("input", { type: "radio", name: "gender", value: "Male", checked: gender === 'Male', onChange: () => setGender('Male') }),
                        ' ',
                        "Male"))),
            react_1.default.createElement("label", { htmlFor: "address" }, "Address"),
            react_1.default.createElement("textarea", { id: "address", name: "address", value: address, onChange: (e) => setAddress(e.target.value), placeholder: "Enter Address", rows: 4, cols: 50, onKeyPress: (e) => {
                    if (!addressPattern.test(e.key)) {
                        e.preventDefault();
                    }
                }, onKeyDown: (e) => {
                    if (!addressPattern.test(e.key)) {
                        e.preventDefault();
                    }
                }, onPaste: (e) => {
                    const pastedText = e.clipboardData.getData('text/plain');
                    if (!addressPattern.test(pastedText)) {
                        e.preventDefault();
                    }
                } }),
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("input", { id: "email", type: "email", name: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter Email" }),
            react_1.default.createElement("label", { htmlFor: "mobileNo" }, "Mobile Number"),
            react_1.default.createElement("input", { id: "mobileNo", type: "tel", name: "mobileNo", value: mobileNo, onChange: handleMobileNoChange, placeholder: "Enter Mobile Number" }),
            react_1.default.createElement("label", { htmlFor: "age" }, "Age"),
            react_1.default.createElement("input", { id: "age", type: "number", name: "age", value: age, onChange: (e) => setAge(e.target.value), placeholder: "Enter Age" }),
            react_1.default.createElement("label", { htmlFor: "date" }, "Date of Joining"),
            react_1.default.createElement("input", { id: "date", type: "date", name: "date", value: date, onChange: (e) => setDate(e.target.value), max: (0, date_fns_1.format)(today, 'yyyy-MM-dd'), min: (0, date_fns_1.format)(threeMonthsAgo, 'yyyy-MM-dd'), placeholder: "Select Date of Joining" }),
            react_1.default.createElement("label", { htmlFor: "deptName" }, "Department Name"),
            react_1.default.createElement("select", { id: "deptName", name: "deptName", value: deptName, onChange: (e) => setDeptName(e.target.value) },
                react_1.default.createElement("option", { value: "" }, "Select Department"),
                departments.map((dept) => (react_1.default.createElement("option", { key: dept, value: dept }, dept)))),
            react_1.default.createElement("label", { htmlFor: "roleName" }, "Role Name"),
            react_1.default.createElement("select", { id: "roleName", name: "roleName", value: roleName, onChange: (e) => setRoleName(e.target.value) },
                react_1.default.createElement("option", { value: "" }, "Select Role"),
                roles.map((role) => (react_1.default.createElement("option", { key: role, value: role }, role)))),
            react_1.default.createElement("div", { style: { marginTop: '30px' } },
                react_1.default.createElement("input", { type: "submit", value: "Add" }),
                react_1.default.createElement("input", { style: { marginLeft: '12px' }, className: "muted-button", type: "button", value: "Cancel", onClick: () => setIsAdding(false) })))));
}
exports.default = Add;
