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
const namePattern = /^[a-zA-Z]+$/;
const addressPattern = /^[a-zA-Z0-9\s,.:/\\-]+$/;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 25;
const emailPattern = /^(?![-_.])[a-zA-Z0-9_%+-]+(?!\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function Edit({ selectedEmployee, employees, setEmployees, setIsEditing }) {
    const [firstName, setFirstName] = (0, react_1.useState)(selectedEmployee.firstname);
    const [lastName, setLastName] = (0, react_1.useState)(selectedEmployee.lastname);
    const [gender, setGender] = (0, react_1.useState)(selectedEmployee.gender);
    const [address, setAddress] = (0, react_1.useState)(selectedEmployee.address);
    const [email, setEmail] = (0, react_1.useState)(selectedEmployee.email);
    const [mobileNo, setMobileNo] = (0, react_1.useState)(selectedEmployee.mobile_no.toString());
    const [age, setAge] = (0, react_1.useState)(selectedEmployee.age.toString());
    const [date, setDate] = (0, react_1.useState)(selectedEmployee.date_of_join ? selectedEmployee.date_of_join.split('T')[0] : '');
    const [deptName, setDeptName] = (0, react_1.useState)(selectedEmployee.dept_name);
    const [roleName, setRoleName] = (0, react_1.useState)(selectedEmployee.role_name);
    const validateName = (name) => !name || !namePattern.test(name) || name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;
    const validateEmail = (email) => emailPattern.test(email);
    const validateMobileNo = (mobileNo) => mobileNo.length === 10 && !/^0+$/.test(mobileNo) && !isNaN(parseInt(mobileNo));
    const validateAge = (age) => !isNaN(parseInt(age)) && parseInt(age) >= 18 && parseInt(age) <= 70;
    const handleUpdate = (e) => {
        e.preventDefault();
        if (validateName(firstName) || validateName(lastName)) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'First name and last name should not contain special characters.',
                showConfirmButton: true,
            });
        }
        if (!validateEmail(email)) {
            setEmail('');
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid email address format.',
                showConfirmButton: true,
            });
        }
        if (!gender || !address || !email || !mobileNo || !age || !date || !deptName || !roleName) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        if (!validateMobileNo(mobileNo)) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Mobile number must be a valid 10-digit number.',
                showConfirmButton: true,
            });
        }
        if (!validateAge(age)) {
            return sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Age must be between 18 and 70.',
                showConfirmButton: true,
            });
        }
        const updatedEmployee = {
            emp_id: selectedEmployee.emp_id,
            firstname: firstName,
            lastname: lastName,
            gender: gender,
            address: address,
            email: email,
            mobile_no: parseInt(mobileNo),
            age: parseInt(age),
            date_of_join: new Date(date).toISOString(),
            dept_name: deptName,
            role_name: roleName,
        };
        axios_1.default
            .put(`http://192.168.11.150:4000/employees/${selectedEmployee.emp_id}`, updatedEmployee, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
            // Handle the response from the API and update the employees state
            const updatedEmployees = employees.map((employee) => employee.emp_id === selectedEmployee.emp_id ? response.data : employee);
            setEmployees(updatedEmployees);
            setIsEditing(false);
            sweetalert2_1.default.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${response.data.firstname} ${response.data.lastname}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
            });
        })
            .catch((error) => {
            // Handle errors from the API request
            console.error('Error updating employee:', error);
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update employee data.',
                showConfirmButton: true,
            });
        });
    };
    const handleMobileNoChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setMobileNo(numericValue);
    };
    return (react_1.default.createElement("div", { className: "small-container" },
        react_1.default.createElement("form", { onSubmit: handleUpdate },
            react_1.default.createElement("h1", null, "Edit Employee"),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "First Name"),
            react_1.default.createElement("input", { id: "firstName", type: "text", name: "firstName", value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Enter First Name" }),
            !!firstName && !namePattern.test(firstName) && (react_1.default.createElement("span", { style: { color: 'red' } }, "First name should not contain special characters.")),
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
            react_1.default.createElement("input", { id: "date", type: "date", name: "date", value: date, onChange: (e) => setDate(e.target.value), max: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd'), min: (0, date_fns_1.format)(new Date(new Date().getFullYear() - 4, new Date().getMonth(), new Date().getDate()), 'yyyy-MM-dd'), placeholder: "Select Date of Joining" }),
            react_1.default.createElement("label", { htmlFor: "deptName" }, "Department Name"),
            react_1.default.createElement("input", { id: "deptName", type: "text", name: "deptName", value: deptName, onChange: (e) => setDeptName(e.target.value) }),
            react_1.default.createElement("label", { htmlFor: "roleName" }, "Role Name"),
            react_1.default.createElement("input", { id: "roleName", type: "text", name: "roleName", value: roleName, onChange: (e) => setRoleName(e.target.value) }),
            react_1.default.createElement("div", { style: { marginTop: '30px' } },
                react_1.default.createElement("input", { type: "submit", value: "Update" }),
                react_1.default.createElement("input", { style: { marginLeft: '12px' }, className: "muted-button", type: "button", value: "Cancel", onClick: () => setIsEditing(false) })))));
}
exports.default = Edit;
