import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const UserProjectSelector = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/senso/user/all')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        if (selectedUser) {
            axios.get(`http://localhost:8080/senso/project/getByUser/${selectedUser}`)
                .then((response) => setProjects(response.data))
                .catch((error) => console.error('Error fetching projects:', error));
        }
    }, [selectedUser]);

    const handleUserChange = (e) => {
        const { value } = e.target;
        setSelectedUser(value);
    };

    return (
        <div>
            <div>
                <label htmlFor="userSelect">Select User:</label>
                <select
                    id="userSelect"
                    onChange={handleUserChange}
                    value={selectedUser}
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.userId} value={user.userId}>
                            {user.userName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div>
                    <h3>Projects for {selectedUser}</h3>
                    <ul>
                        {projects.map((project) => (
                            <ul>
                                {projects.map((project) => (
                                    <li key={project.projectId}>
                                        <strong>Project ID: </strong> {project.projectId} <br />
                                        <strong>Start Date: </strong> {format(new Date(project.startDate), 'dd-MM-yyyy')} <br />
                                        <strong>End Date: </strong> {format(new Date(project.endDate), 'dd-MM-yyyy')} <br />
                                        <strong>Assigned User: </strong>{project.assignedUser.userName}
                                        <br />
                                        <strong>Project Budget: </strong> {project.projectBudget?.budgetAmount} euros for {project.projectBudget?.budgetDuration} days <br />
                                        <strong>Project Category: </strong> {project.projectCategory.categoryName} (Code: {project.projectCategory.categoryCode})
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProjectSelector;
