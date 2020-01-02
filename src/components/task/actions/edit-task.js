import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * React edit task web component.
 * 
 * @param {function} addTask 
 */
const EditTask = ({ editTask, currentTask, toggleSelectedRow }) => {
	const [userValue, setUserValue] = useState(currentTask);

	/**
	 * Edits an existing task based on the user's input.
	 * 
	 * Prevent default actions from the event.
	 * If the event value is empty, return immediately.
	 * Create a constant based on the existing task's values then update it to the user's data.
	 * Call the editTask function with the new constant.
	 * Reset the user's input value to an emtpy string.
	 * Toggle the selected row to unselect and make it uneditable.
	 * 
	 * @param {Object} event - Standard Web Event 
	 */
	const handleSubmit = event => {
		event.preventDefault();
		if (!userValue) {
			return;
        }
        const updatedTask = {
			...currentTask, 
			name: userValue
		};
		editTask(updatedTask);
		setUserValue("");
		toggleSelectedRow();
	};

	return (
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
	);
};

export default EditTask;