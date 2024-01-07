import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const budgetsResponse = await axios.get('http://localhost:8080/senso/budget/all');
                setBudgets(budgetsResponse.data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };

        fetchBudgets();
    }, []);

    console.log("BudgetList Component is rendering");

    return (
        <div>
            <h2>Budget List</h2>
            <ul>
                {budgets.map((budget) => (
                    <li key={budget.budgetCode}>
                        <strong>Budget Code:</strong> {budget.budgetCode} <br />
                        <strong>Budget Amount:</strong> {budget.budgetAmount} euros <br />
                        <strong>Budget Duration:</strong> {budget.budgetDuration} days
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetList;