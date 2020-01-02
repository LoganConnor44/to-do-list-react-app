import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten, makeStyles } from '@material-ui/core/styles';

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
    titleIcons: {
        display: 'flex'
    }
}));

const TableToolbar = ({selected, setSelected, batchRemoveTasks, batchCompleteTasks, removeTask, completeTask}) => {
    const classes = useToolbarStyles();
    const numSelected = selected.filter(x => x.id !== null).length;

    /**
     * Filters out Objects in an array that have and id of null.
     * 
     * @param {any Object with an index of `id`} elements 
     */
    const removeItemsWithNullId = elements => elements.filter(item => item.id !== null);

    /**
     * Logic to determine if a single or batch update is appropriate.
     * 
     * @param {Integer} numSelected 
     */
    const completeTasksAndClearSelected = () => {
        const nonNullSelected = removeItemsWithNullId(selected);
        if (numSelected === 1) {
            completeTask(nonNullSelected[0]);
        } else {
            batchCompleteTasks(selected);
        }
        
        setSelected([]);
    };

    const removeTasksAndClearSelected = () => {
        const nonNullSelected = removeItemsWithNullId(selected);
        if (numSelected === 1) {
            removeTask(nonNullSelected[0]);
        } else {
            batchRemoveTasks(nonNullSelected);
        }
        
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
                <div className={classes.titleIcons}>
                    <Tooltip title="Done">
                        <IconButton aria-label="done" onClick={completeTasksAndClearSelected}>
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={removeTasksAndClearSelected}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
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

export default TableToolbar;