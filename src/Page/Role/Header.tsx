import React, { useState } from 'react';
interface HeaderProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  handleRoleFilter: (filter: string) => void;
}
function Header({ setIsAdding, handleRoleFilter }: HeaderProps) {
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRoleFilter = e.target.value;
    setRoleFilter(newRoleFilter);
    handleRoleFilter(newRoleFilter); // Call the callback function with the updated roleFilter value
  };
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '-11px',
  };
  const selectContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '28%',
  };
  const selectLabelStyle: React.CSSProperties = {
    marginRight: '8px',
    width: '72%',
  };
  return (
    <header>
      <h1>Role Management</h1>
      <div style={headerStyle}>
        <div>
          <button onClick={() => setIsAdding(true)} className="round-button" title="Add Role">
            Add Button
          </button>
        </div>
        <div style={selectContainerStyle}>
          <label htmlFor="roleFilter" style={selectLabelStyle}>
            Filter By Role:
          </label>
          <select id="roleFilter" value={roleFilter} onChange={handleRoleFilterChange}>
            <option value="All">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        {/* Pagination component can be added here */}
      </div>
    </header>
  );
}
export default Header;
