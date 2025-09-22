import React from 'react';

export default function EmployeeForm({ onSubmit }) {
  const [form, setForm] = React.useState({
    name: '',
    age: '',
    location: '',
    employeeId: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = React.useState(null);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm(f => ({ ...f, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.image && form.name && form.age && form.location && form.employeeId) {
      onSubmit(form);
    } else {
      alert('Please fill all fields and upload an image.');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Employee Info</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required type="number" min="18" />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
      <input name="image" type="file" accept="image/*" onChange={handleChange} required />
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 100, height: 120, objectFit: 'cover', margin: 8 }} />}
  <button type="submit" style={{ background: '#28a745', color: '#fff', fontWeight: 'bold' }}>Generate ID Card</button>
    </form>
  );
}
