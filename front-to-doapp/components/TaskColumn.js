import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, tasks, onAddTask }) => {
    return (
        <div className="task-column">
            <h2>{status}</h2>
            <button onClick={onAddTask}>Add Task</button>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;