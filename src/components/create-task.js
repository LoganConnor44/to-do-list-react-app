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
const CreateTask = ({ addTask }) => {
	const [value, setValue] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		if (!value) {
			return;
		}
		addTask(value);
		setValue("");
	};

	return (
		<create-task-form-styling>
			<form onSubmit={handleSubmit}
				noValidate
				autoComplete="off">
			<create-task-container-left>
				<TextField label="Task"
					type="text"
					value={value}
					placeholder="Add a new task"
					onChange={event => setValue(event.target.value)} />
			</create-task-container-left>
			<create-task-container-right>
				<Tooltip title="save" >
						<IconButton aria-label="save" 
							type="submit">
							<SendIcon />
						</IconButton>
					</Tooltip>
			</create-task-container-right>
			</form>
		</create-task-form-styling>
	);
};

export default CreateTask;