"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'to do', due_date: '2024-08-10', projectId: 1 },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1' },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newTaskId, setNewTaskId] = useState(6);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [projectToUpdate, setProjectToUpdate] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleAddTask = (task) => {
    const newTask = { id: newTaskId, ...task, projectId: selectedProject };
    setTasks([...tasks, newTask]);
    setNewTaskId(newTaskId + 1);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToUpdate(null);
  };

  const handleCreateProject = (project) => {
    const newProject = { id: projects.length + 1, ...project };
    setProjects([...projects, newProject]);
    setSelectedProject(newProject.id);
    setIsProjectModalOpen(false);
  };

  const handleUpdateProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setProjectToUpdate(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setTasks(tasks.filter(task => task.projectId !== projectId));
    setSelectedProject(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toDoTasks = tasks.filter(task => task.status === 'to do' && task.projectId === selectedProject);
  const doingTasks = tasks.filter(task => task.status === 'doing' && task.projectId === selectedProject);
  const doneTasks = tasks.filter(task => task.status === 'done' && task.projectId === selectedProject);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex">
      <Sidebar
        projects={projects}
        onCreateProject={() => setIsProjectModalOpen(true)}
        onSelectProject={setSelectedProject}
        onDeleteProject={handleDeleteProject}
        onUpdateProject={handleUpdateProject}
        selectedProject={selectedProject}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className={`content ${selectedProject ? 'shifted' : ''}`}>
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onCreate={project => {
            if (projectToUpdate) {
              // Handle project update
              setProjects(projects.map(p => p.id === projectToUpdate.id ? { ...projectToUpdate, ...project } : p));
              setProjectToUpdate(null);
            } else {
              // Handle project creation
              handleCreateProject(project);
            }
            setIsProjectModalOpen(false);
          }}
          initialValues={projectToUpdate} // Pass the projectToUpdate to the Modal
        />
        <TaskFormModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
        {taskToUpdate && (
          <TaskFormModal
            isOpen={true}
            onClose={() => setTaskToUpdate(null)}
            onAddTask={handleUpdateTask}
            initialValues={taskToUpdate}
          />
        )}
        {selectedProject && (
          <div className="task-board grid grid-cols-3 gap-4 p-4">
            <div className="task-column">
              <h2>To do</h2>
              {toDoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onUpdate={setTaskToUpdate}
                />
              ))}
              <button className="add-task-btn" onClick={() => setIsTaskModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="task-column">
              <h2>Doing</h2>
              {doingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onUpdate={setTaskToUpdate}
                />
              ))}
              <button className="add-task-btn" onClick={() => setIsTaskModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="task-column">
              <h2>Done</h2>
              {doneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onUpdate={setTaskToUpdate}
                />
              ))}
              <button className="add-task-btn" onClick={() => setIsTaskModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
