import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
		<form-styling>
			<form onSubmit={handleSubmit}
				noValidate
				autoComplete="off">
				<TextField
					label="Task"
					type="text"
					className="input asdf"
					value={value}
					placeholder="Add a new task"
					onChange={event => setValue(event.target.value)}
					style={{ color: "rgba(0, 0, 0, 0.87)"}} />
				<Tooltip title="save" >
					<IconButton aria-label="save" type="input">
						<SendIcon />
					</IconButton>
				</Tooltip>
			</form>
		</form-styling>
	);
};

export default CreateTask;