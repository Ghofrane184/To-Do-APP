import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onCreate, initialValues }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  useEffect(() => {
    if (initialValues) {
      setProjectName(initialValues.name);
      setProjectDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = { name: projectName, description: projectDescription };
    if (initialValues) {
      // Update the existing project
      onCreate({ ...initialValues, ...project });
    } else {
      // Create a new project
      onCreate(project);
    }
    setProjectName('');
    setProjectDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{initialValues ? 'Update Project' : 'Create New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter project description"
              required
            />
          </label>
          <button type="submit">{initialValues ? 'Update Project' : 'Create Project'}</button>
          <button className="modal-close" type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
