import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectForm = () => {
  const { projectId } = useParams();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    startDate: '',
    endDate: '',
    assignedUser: null,
    projectCategory: {},
    projectBudget: null
  });

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    axios.get('http://localhost:8080/senso/category/all')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios.get('http://localhost:8080/senso/user/all')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));

    axios.get('http://localhost:8080/senso/budget/all')
      .then((response) => setBudgets(response.data))
      .catch((error) => console.error('Error fetching budgets:', error));
  }, []);

  const fetchProjectData = async (projectId) => {
    try {
      const projectResponse = await axios.get(`http://localhost:8080/senso/project/${projectId}`);
      const projectData = projectResponse.data;
      // Update the form data with the existing project data
      setFormData({
        projectId: projectData.projectId,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        assignedUser: projectData.assignedUser,
        projectBudget: projectData.projectBudget,
        projectCategory: projectData.projectCategory,
      });
    } catch (error) {
      console.error(`Error fetching project data for ID ${projectId}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBudgetSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      projectBudget: value !== '' ? {
        budgetCode: value
      } : null,
    }));
  };

  const handleCategorySelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      projectCategory: {
        categoryCode: value
      },
    }));
  }

  const handleUserSelectChange = (e) => {
    const { value } = e.target;
    console.log(value)
    setFormData((prevData) => ({
      ...prevData,
      assignedUser: value !== '' ? {
        userId: value
      }: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/senso/project/', formData);
      setFormData({
        projectId: '',
        startDate: '',
        endDate: '',
        assignedUser: null,
        projectCategory: {},
        projectBudget: null
      })
    } catch (error) {
      console.error('Error creating/updating project:', error);
    }
  };

  return (
    <div>
      <h2>{projectId ? 'Modify' : 'Create'}  Project {projectId && `( ${projectId})`} :</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectId">Project ID : </label>
          <input
            type="text"
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date : </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date : </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="assignedUser">Assigned User:</label>
          <select
            id="assignedUser"
            name="assignedUser"
            value={formData.assignedUser?.userId}
            onChange={handleUserSelectChange}
          >
            <option value="">Select User : </option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="projectCategory">Project Category:</label>
          <select
            id="projectCategory"
            name="projectCategory"
            value={formData.projectCategory.categoryCode}
            onChange={handleCategorySelectChange}
            required
          >
            <option value="">Select Category : </option>
            {categories.map((category) => (
              <option key={category.categoryCode} value={category.categoryCode}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectBudget">Project Budget:</label>
          <select
            id="projectBudget"
            name="projectBudget"
            value={formData.projectBudget?.budgetCode}
            onChange={handleBudgetSelectChange}
          >
            <option value="">Select Budget : </option>
            {budgets.map((budget) => (
              <option
                key={budget.budgetCode}
                value={budget.budgetCode}
              >
                {`${budget.budgetAmount} / ${budget.budgetDuration}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">{projectId ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
