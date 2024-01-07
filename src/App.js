import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import UserProjects from './components/UserProjects';
import BudgetList from './components/BudgetList';
import CategoryForm from './components/CreateCategory';
import BudgetForm from './components/CreateBudget';
import UserForm from './components/UserForm';
import CategoryProjectList from './components/ProjectListByCategory';
import UserProjectSelector from './components/ProjectsByUser'
const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/create-update-project">Create/Modify Project</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Project List</NavLink>
            </li>
            <li>
              <NavLink to="/active-projects">Active Project List</NavLink>
            </li>
            <li>
              <NavLink to="/budgets">Budget List</NavLink>
            </li>
            <li>
              <NavLink to="/create-category">Create Category</NavLink>
            </li>
            <li>
              <NavLink to="/create-budget">Create Budget</NavLink>
            </li>
            <li>
              <NavLink to="/create-user">Create User</NavLink>
            </li>
            <li>
              <NavLink to="/category-projects">Project List By Category</NavLink>
            </li>
            <li>
              <NavLink to="/user-projects">Project List By User</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-update-project/:projectId?" element={<ProjectForm />} />
          <Route path="/projects" element={<ProjectList isActive={false} />} />
          <Route path="/active-projects" element={<ProjectList isActive={true} />} />
          <Route path="/projects/user/:userId" element={<UserProjects />} />
          <Route path="/budgets" element={<BudgetList />} />
          <Route path="/create-category" element={<CategoryForm />} />
          <Route path="/create-budget" element={<BudgetForm />} />
          <Route path="/create-user" element={<UserForm />} />
          <Route path="/category-projects" element={<CategoryProjectList />} />
          <Route path="/user-projects" element={<UserProjectSelector />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
