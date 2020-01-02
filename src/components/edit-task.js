import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../styles/create-task.css';

/**
 * React create task web component.
 * 
 * @param {function} addTask 
 */
const EditTask = ({ editTask, currentTask, toggleSelectedRowAndEditability }) => {
	const [userValue, setUserValue] = useState(currentTask);

	const handleSubmit = event => {
		event.preventDefault();
		if (!userValue) {
			return;
        }
        const updatedTask = {...currentTask, name: userValue};
		editTask(updatedTask);
		setUserValue("");
		toggleSelectedRowAndEditability();
	};

	return (
		<form-styling>
			<form onSubmit={handleSubmit}
				noValidate
				autoComplete="off">
				<TextField
					label="Edit Task"
					type="text"
					defaultValue={userValue.name}
					placeholder="Add a new task"
					onChange={event => setUserValue(event.target.value)} />
			</form>
		</form-styling>
	);
};

export default EditTask;