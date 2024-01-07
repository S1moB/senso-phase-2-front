import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/senso/user/', formData);
      alert('User created successfully!');
      setFormData({
        userId: '',
        userName: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create User</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
