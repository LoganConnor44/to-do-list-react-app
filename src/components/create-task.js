import React, {useState} from 'react';

/**
 * React create task web component.
 * 
 * @param {function} addTask 
 */
const CreateTask = ({addTask}) => {
    const [value, setValue] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        if (!value) {
            return;
        }
        addTask(value);
        setValue("");
    };

    return(
        <form onSubmit = {handleSubmit}>
            <input type = "text"
                className = "input"
                value = {value}
                placeholder = "Add a new task"
                onChange = {event => setValue(event.target.value)} />
        </form>
    );
};

export default CreateTask;