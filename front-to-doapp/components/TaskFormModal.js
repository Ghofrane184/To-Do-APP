import React, { useState, useEffect } from 'react';

const TaskFormModal = ({ isOpen, onClose, onAddTask, initialValues }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to do');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setStatus(initialValues.status);
      setDueDate(initialValues.due_date);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, status, due_date: dueDate };
    if (initialValues) {
      // Update the existing task
      onAddTask({ ...initialValues, ...task });
    } else {
      // Add a new task
      onAddTask(task);
    }
    setTitle('');
    setDescription('');
    setStatus('to do');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{initialValues ? 'Update Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              required
            />
          </label>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="to do">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">{initialValues ? 'Update Task' : 'Add Task'}</button>
          <button className="modal-close" type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
