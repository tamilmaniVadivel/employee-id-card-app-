import React from 'react';

export default function EmployeeIdSearch({ onSearch }) {
  const [employeeId, setEmployeeId] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (employeeId) onSearch(employeeId);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Retrieve Employee ID Card</h2>
      <input
        name="employeeId"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={e => setEmployeeId(e.target.value)}
        required
      />
  <button type="submit" style={{ background: '#28a745', color: '#fff', fontWeight: 'bold' }}>Retrieve</button>
    </form>
  );
}
