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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function Header({ setIsAdding, handleRoleFilter }) {
    const [roleFilter, setRoleFilter] = (0, react_1.useState)('All');
    const handleRoleFilterChange = (e) => {
        const newRoleFilter = e.target.value;
        setRoleFilter(newRoleFilter);
        handleRoleFilter(newRoleFilter); // Call the callback function with the updated roleFilter value
    };
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '-11px',
    };
    const selectContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '28%',
    };
    const selectLabelStyle = {
        marginRight: '8px',
        width: '72%',
    };
    return (react_1.default.createElement("header", null,
        react_1.default.createElement("h1", null, "Role Management"),
        react_1.default.createElement("div", { style: headerStyle },
            react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: () => setIsAdding(true), className: "round-button", title: "Add Role" }, "Add Button")),
            react_1.default.createElement("div", { style: selectContainerStyle },
                react_1.default.createElement("label", { htmlFor: "roleFilter", style: selectLabelStyle }, "Filter By Role:"),
                react_1.default.createElement("select", { id: "roleFilter", value: roleFilter, onChange: handleRoleFilterChange },
                    react_1.default.createElement("option", { value: "All" }, "All"),
                    react_1.default.createElement("option", { value: "true" }, "Active"),
                    react_1.default.createElement("option", { value: "false" }, "Inactive"))))));
}
exports.default = Header;
