import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        background: "white"
      },
    },
  }));

/**
 * React create task web component.
 * 
 * @param {function} addTask 
 */
const CreateTask = ({addTask}) => {
    const classes = useStyles();
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
        <form onSubmit = {handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off">
            <TextField 
                label = "Task"
                type = "text"
                className = "input"
                value = {value}
                placeholder = "Add a new task"
                onChange = {event => setValue(event.target.value)} />
        </form>
    );
};

export default CreateTask;