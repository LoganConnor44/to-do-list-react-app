import React from 'react';
import StatusEnum from '../util/status-enum';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * React task web component.
 *  
 * @param {json} task
 * @param {integer} index
 * @param {function} completeTask
 * @param {function} removeTask 
 */
const TaskTable = ({tasks, completeTask, removeTask}) => {
    return (
        <Table aria-lable="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                tasks.map((task, index) => (
                    <TableRow key={task.id} 
                        style={{ 
                            textDecoration: task.status !== StatusEnum.ACTIVE ? "line-through" : ""   
                        }}
                        selected={task.status !== StatusEnum.ACTIVE ? true : false}>
                        <TableCell component="th" scope="row">{task.name}</TableCell>
                        <TableCell component="th" scope="row">{task.description}</TableCell>
                        <TableCell component="th" scope="row">
                            <button onClick = {() => completeTask(index, task)}>
                                Complete
                            </button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <button style = {{background: "red"}} 
                                onClick = {() => removeTask(index, task)}>
                                    x
                            </button>
                        </TableCell>
                    </TableRow>
                ))
            }            
            </TableBody>
        </Table>
    );
};

export default TaskTable;