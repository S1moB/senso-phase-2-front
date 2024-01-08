import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CategoryProjectList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get('http://localhost:8080/senso/category/all');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = async (event) => {
        const selectedCategoryCode = event.target.value;
        setSelectedCategory(selectedCategoryCode);
        try {
            const projectsResponse = await axios.get(`http://localhost:8080/senso/project/getByCategory/${selectedCategoryCode}`);
            setProjects(projectsResponse.data);
        } catch (error) {
            console.error(`Error fetching projects for category ${selectedCategoryCode}:`, error);
        }
    };

    return (
        <div>
            <h2>Category Project List</h2>
            <div>
                <label htmlFor="categorySelect">Select Category:</label>
                <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.categoryCode} value={category.categoryCode}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCategory && (
                <div>
                    <h3>Projects for Category: {selectedCategory}</h3>
                    <ul>
                        {projects.map((project) => (
                            <li key={project.projectId}>
                                <strong>Project ID: </strong> {project.projectId} <br />
                                <strong>Start Date: </strong> {format(new Date(project.startDate), 'dd-MM-yyyy')} <br />
                                <strong>End Date: </strong> {format(new Date(project.endDate), 'dd-MM-yyyy')} <br />
                                <strong>Assigned User: </strong>
                                <Link to={`/user-projects/${project.assignedUser?.userId}`}>
                                    {project.assignedUser.userName}
                                </Link>
                                <br />
                                <strong>Project Budget: </strong> {project.projectBudget?.budgetAmount} euros for {project.projectBudget?.budgetDuration} days <br />
                                <strong>Project Category: </strong> {project.projectCategory.categoryName} (Code: {project.projectCategory.categoryCode})
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryProjectList;
