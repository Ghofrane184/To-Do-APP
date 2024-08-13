import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTasks, faUser, faBell, faEnvelope, faMoon, faSun, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ projects, onCreateProject, onSelectProject, selectedProject, toggleDarkMode, isDarkMode, onDeleteProject, onUpdateProject }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="profile-section">
        <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" />
        <span className="username">Ghofrane benfraj</span>
      </div>
      <div className="nav-section">
        <button className="nav-item" onClick={() => onCreateProject()}>
          <FontAwesomeIcon icon={faPlus} />
          {!collapsed && <span>Create Project</span>}
        </button>
        {projects.map(project => (
          <div
            key={project.id}
            className={`nav-item ${selectedProject === project.id ? 'active' : ''}`}
            onClick={() => onSelectProject(project.id)}
          >
            <FontAwesomeIcon icon={faTasks} />
            <span className="project-name">{project.name}</span>
            <div className="project-actions">
              <button className="update-project-btn" onClick={() => onUpdateProject(project.id)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="delete-project-btn" onClick={() => onDeleteProject(project.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-nav">
        
       
       
        <div className="nav-item" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          {!collapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
