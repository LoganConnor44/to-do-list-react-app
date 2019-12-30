import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../styles/create-task.css';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * React create task web component.
 * 
 * @param {function} addTask 
 */
const EditTask = ({ editTask, currentTask }) => {
	const [userValue, setUserValue] = useState(currentTask);

	const handleSubmit = event => {
		event.preventDefault();
		if (!userValue) {
			return;
        }
        const updatedTask = {...currentTask, name: userValue};
		editTask(updatedTask);
		setUserValue("");
	};

	return (
		<form-styling>
			<form onSubmit={handleSubmit}
				noValidate
				autoComplete="off">
				<TextField
					label="Edit Task"
					type="text"
					value={userValue.name}
					placeholder="Add a new task"
					onChange={event => setUserValue(event.target.value)} />
				<Tooltip title="save" >
					<IconButton aria-label="save" type="submit">
						<SendIcon />
					</IconButton>
				</Tooltip>
			</form>
		</form-styling>
	);
};

export default EditTask;