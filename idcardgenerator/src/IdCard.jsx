import React from 'react';

export default function IdCard({ employee, imageUrl, idCardRef }) {
  if (!employee) return null;
  return (
    <div ref={idCardRef} style={{
      width: 320,
      height: 200,
      border: '2px solid #333',
      borderRadius: 12,
      padding: 16,
      background: '#f9f9f9',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      margin: 'auto',
      marginTop: 24,
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 8px #aaa',
    }}>
      <img src={imageUrl} alt="Employee" style={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #888' }} />
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Employee ID Card</h3>
        <div><b>Name:</b> {employee.name}</div>
        <div><b>Age:</b> {employee.age}</div>
        <div><b>Location:</b> {employee.location}</div>
        <div><b>ID:</b> {employee.employeeId}</div>
      </div>
    </div>
  );
}
