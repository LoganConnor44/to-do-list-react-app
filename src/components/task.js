import React from 'react';
import StatusEnum from '../util/status-enum';

/**
 * React task web component.
 *  
 * @param {json} task
 * @param {integer} index
 * @param {function} completeTask
 * @param {function} removeTask 
 */
const Task = ({task, index, completeTask, removeTask}) => {
    return (
        <div className="task" 
            style={{ textDecoration: task.status !== StatusEnum.ACTIVE ? "line-through" : ""}} >
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <button style = {{background: "red"}} 
                onClick = {() => removeTask(index)}>
                    x
            </button>
            <button onClick = {() => completeTask(index)}>
                Complete
            </button>
        </div>
    );
};

export default Task;