import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

const ProjectList = ({ isActive }) => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsResponse = await axios.get(isActive ?
                    'http://localhost:8080/senso/project/allActive'
                    : 'http://localhost:8080/senso/project/all');
                setProjects(projectsResponse.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [isActive]);

    const handleEditClick = (projectId) => {
        console.log(`Edit project with ID: ${projectId}`);
        navigate(`/create-update-project/${projectId}`);
    };

    const handleDeleteClick = async (projectId) => {
        // Handle delete click, e.g., send delete request to API
        try {
            await axios.delete(`http://localhost:8080/senso/project/${projectId}`);
            // Update projects after successful delete
            setProjects((prevProjects) => prevProjects.filter((project) => project.projectId !== projectId));
            console.log(`Deleted project with ID: ${projectId}`);
        } catch (error) {
            console.error(`Error deleting project with ID ${projectId}:`, error);
        }
    };

    return (
        <div>
            <h2>{isActive ? 'Active ' : ''}Project List</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.projectId}>
                        <strong>Project ID: </strong> {project.projectId} <br />
                        <strong>Start Date: </strong> {format(new Date(project.startDate), 'dd-MM-yyyy')} <br />
                        <strong>End Date: </strong> {format(new Date(project.endDate), 'dd-MM-yyyy')} <br />
                        <strong>Assigned User: </strong>
                        <Link to={`/projects/user/${project.assignedUser?.userId}`}>
                            {project.assignedUser?.userName}
                        </Link>
                        <br />
                        {project.projectBudget &&
                            <>
                                <strong>Project Budget: </strong> {project.projectBudget?.budgetAmount} euros for {project.projectBudget?.budgetDuration} days <br />
                            </>
                        }
                        <strong>Project Category: </strong> {project.projectCategory?.categoryName} (Code: {project.projectCategory?.categoryCode})
                        <br />
                        <button onClick={() => handleEditClick(project.projectId)}>Edit</button>
                        <button onClick={() => handleDeleteClick(project.projectId)}>Delete</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
