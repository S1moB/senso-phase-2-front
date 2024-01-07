import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = () => {
    const [formData, setFormData] = useState({
        budgetCode: '',
        budgetAmount: '',
        budgetDuration: '',
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
            await axios.post('http://localhost:8080/senso/budget/', formData);
            alert('Budget created successfully!');
            setFormData({
                budgetCode: '',
                budgetAmount: '',
                budgetDuration: '',
            })
        } catch (error) {
            console.error('Error creating budget:', error);
        }
    };

    return (
        <div>
            <h2>Create Budget</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="budgetCode">Budget Code:</label>
                    <input
                        type="text"
                        id="budgetCode"
                        name="budgetCode"
                        value={formData.budgetCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="budgetAmount">Budget Amount:</label>
                    <input
                        type="text"
                        id="budgetAmount"
                        name="budgetAmount"
                        value={formData.budgetAmount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="budgetDuration">Budget Duration:</label>
                    <input
                        type="text"
                        id="budgetDuration"
                        name="budgetDuration"
                        value={formData.budgetDuration}
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

export default BudgetForm;
