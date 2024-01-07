import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        categoryCode: '',
        categoryName: '',
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
            await axios.post('http://localhost:8080/senso/category/', formData);
            alert('Category created successfully!');
            setFormData({
                categoryCode: '',
                categoryName: '',
            })
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="categoryCode">Category Code:</label>
                    <input
                        type="text"
                        id="categoryCode"
                        name="categoryCode"
                        value={formData.categoryCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
