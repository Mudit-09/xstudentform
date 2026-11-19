import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    college: '',
    email: '',
    password: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username !== formData.username.toLowerCase()) {
      newErrors.username = 'Username must be in lowercase';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
    { name: 'college', label: 'College', type: 'text', placeholder: 'Enter your college' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address' },
  ];

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Student Registration Form</h1>

        <form onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>

              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? 'input-error' : ''}
              />

              {errors[field.name] && (
                <p className="error-message">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button type="submit">Register</button>

          {submitted && (
            <p className="success-message">
              Registration successful!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
