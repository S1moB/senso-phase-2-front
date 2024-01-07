import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProjects = () => {
    const { userId } = useParams();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsResponse = await axios.get('http://localhost:8080/senso/project/getByUser/' + userId);
                setProjects(projectsResponse.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [userId]);

    return (
        <div>
            <h2>Project List for user : {userId}</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.projectId}>
                        <strong>Project ID: </strong> {project.projectId} <br />
                        <strong>Start Date: </strong> {project.startDate} <br />
                        <strong>End Date: </strong> {project.endDate} <br />
                        <strong>Project Budget: </strong> {project.projectBudget.budgetAmount} euros for {project.projectBudget.budgetDuration} days <br />
                        <strong>Project Category: </strong> {project.projectCategory.categoryName} (Code: {project.projectCategory.categoryCode})
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProjects;
