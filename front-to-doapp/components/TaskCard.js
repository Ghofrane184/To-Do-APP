import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, onDelete, onUpdate }) => {
    return (
        <div className={`task-card ${task.status}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.due_date}</p>
            <div className="task-card-actions">
                <button className="update-task-btn" onClick={() => onUpdate(task)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-task-btn" onClick={() => onDelete(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
