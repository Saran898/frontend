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
const searchicon_png_1 = __importDefault(require("../../images/searchicon.png"));
const axios_1 = __importDefault(require("axios"));
function Header({ setIsAdding, filterBySearch, setFilteredUsers }) {
    const [searchInput, setSearchInput] = (0, react_1.useState)('');
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
        filterBySearch(e.target.value);
    };
    // Rest of the code remains the same...
    (0, react_1.useEffect)(() => {
        // Fetch employees from the backend API using axios
        axios_1.default
            .get('http://192.168.11.150:4000/employees') // Replace this with your actual backend route
            .then((response) => response.data)
            .then((data) => {
            setFilteredUsers(data);
        })
            .catch((error) => console.error('Error fetching data:', error));
    }, [setFilteredUsers]);
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '-11px',
    };
    const searchContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        padding: '4px',
    };
    const searchInputStyle = {
        border: 'none',
        background: 'none',
        flex: '1',
        padding: '8px',
        fontSize: '16px',
    };
    const searchIconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '8px',
    };
    return (react_1.default.createElement("header", null,
        react_1.default.createElement("h1", null, "Employee Management"),
        react_1.default.createElement("div", { style: headerStyle },
            react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: () => setIsAdding(true), className: 'round-button', title: 'Add Employee' }, "Add Button")),
            react_1.default.createElement("div", { style: searchContainerStyle },
                react_1.default.createElement("input", { type: "text", value: searchInput, onChange: handleSearchInputChange, placeholder: "Search by role name...", style: searchInputStyle }),
                react_1.default.createElement("img", { src: searchicon_png_1.default, alt: "Search", style: searchIconStyle })))));
}
exports.default = Header;
