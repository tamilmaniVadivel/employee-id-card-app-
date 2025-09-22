import React from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeIdSearch from './EmployeeIdSearch';
import IdCard from './IdCard';
import html2canvas from 'html2canvas';
import { openDB } from 'idb';
import './App.css';

const DB_NAME = 'employee-id-db';
const STORE = 'employees';

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'employeeId' });
      }
    },
  });
}

function App() {
  const [tab, setTab] = React.useState('upload');
  const [employee, setEmployee] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const idCardRef = React.useRef();
  const [downloadReady, setDownloadReady] = React.useState(false);
  const [downloadName, setDownloadName] = React.useState('');

  // Handle form submit: store in IndexedDB and show ID card
  async function handleFormSubmit(form) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imgData = e.target.result;
      const emp = { ...form, image: imgData };
      const db = await getDb();
      await db.put(STORE, emp);
      setEmployee(emp);
      setImageUrl(imgData);
      setDownloadReady(false);
      setDownloadName(`${form.employeeId}_id`);
    };
    reader.readAsDataURL(form.image);
  }

  // Handle search by employee ID
  async function handleSearch(employeeId) {
    const db = await getDb();
    const emp = await db.get(STORE, employeeId);
    if (emp) {
      setEmployee(emp);
      setImageUrl(emp.image);
      setDownloadReady(false);
      setDownloadName(`${emp.employeeId}_id`);
    } else {
      setEmployee(null);
      setImageUrl(null);
      alert('Employee not found!');
    }
  }

  // Download ID card as PNG or JPEG
  async function handleDownload(type) {
    if (!idCardRef.current) return;
    const canvas = await html2canvas(idCardRef.current);
    const link = document.createElement('a');
    link.download = `${downloadName}.${type}`;
    link.href = canvas.toDataURL(`image/${type}`);
    link.click();
    setDownloadReady(true);
  }

  return (
    <div>
      <h1>Employee ID Card Generator</h1>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setTab('upload')} style={{ marginRight: 8, background: tab==='upload'? '#646cff':'#f9f9f9', color: tab==='upload'? '#fff':'#333' }}>Upload Info</button>
        <button onClick={() => setTab('retrieve')} style={{ background: tab==='retrieve'? '#646cff':'#f9f9f9', color: tab==='retrieve'? '#fff':'#333' }}>Retrieve ID Card</button>
      </div>
      {tab === 'upload' && <EmployeeForm onSubmit={handleFormSubmit} />}
      {tab === 'retrieve' && <EmployeeIdSearch onSearch={handleSearch} />}
      <IdCard employee={employee} imageUrl={imageUrl} idCardRef={idCardRef} />
      {employee && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => handleDownload('png')}>Download PNG</button>
          <button onClick={() => handleDownload('jpeg')} style={{ marginLeft: 8 }}>Download JPEG</button>
          {downloadReady && <span style={{ marginLeft: 12, color: 'green' }}>Downloaded!</span>}
        </div>
      )}
    </div>
  );
}

export default App
