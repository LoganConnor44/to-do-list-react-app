import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const useToolbarStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

const TableToolbar = ({selected, setSelected, batchRemoveTasks}) => {
    const classes = useToolbarStyles();
    const numSelected = selected.length;

    const removeTasksAndClearSelected = () => {
        batchRemoveTasks(selected);
        setSelected([]);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
            >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                Name Of Goal
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={removeTasksAndClearSelected} />
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                    <FilterListIcon />
                </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

/**
 * React task web component.
 *  
 * @param {json} task
 * @param {integer} index
 * @param {function} completeTask
 * @param {function} removeTask 
 */
const TaskTable = ({tasks, completeTask, removeTask, batchRemoveTasks}) => {
    const [selected, setSelected] = useState([]);

    const isRowSelected = rowItem => {
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].id === rowItem.id) {
                return true;
            }
        }
        return false;
    }

    const selectDeselectRow = (rowTaskItem) => {
        let existingSelectedItems = [...selected];
        if (isRowSelected(rowTaskItem)) {
            existingSelectedItems.splice(existingSelectedItems.indexOf(selected.find( x => x.id === rowTaskItem.id)), 1);
        } else {
            existingSelectedItems.push(rowTaskItem)
        }
        setSelected(existingSelectedItems);
    };

    return (
        <div>
            <TableToolbar selected={selected}
                batchRemoveTasks={batchRemoveTasks}
                setSelected={setSelected} />
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    tasks.map((task, index) => {

                        const rowTaskItem = { 
                            id: task.id, 
                            index: index 
                        };
                        const isItemSelected = isRowSelected(rowTaskItem);

                        return (
                            <TableRow key={index} 
                                hover
                                onClick={() => selectDeselectRow(rowTaskItem)}
                                selected={isItemSelected} >
                                <TableCell component="th" scope="row">{task.name}</TableCell>
                                <TableCell component="th" scope="row">{task.description}</TableCell>
                                <TableCell component="th" scope="row">
                                    <button onClick = {() => completeTask(index, task)}>
                                        Complete
                                    </button>
                                </TableCell>
                                <TableCell padding="checkbox" scope="row">
                                    <Checkbox checked={isItemSelected} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <button style = {{background: "red"}} 
                                        onClick = {() => removeTask(index, task)}>
                                            x
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }            
                </TableBody>
            </Table>
        </div>
    );
};

export default TaskTable;