import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import EditTask from './edit-task';

/**
 * 
 * 
 * @param { {
 *          id: Integer
 *          name: String,
 *          status: StatusEnum,
 *          created: Date,
 *          deadline: Date,
 *          description: null,
 *          diffculty: DifficultyEnum,
 *          importance: ImportanceEnum,
 *          lastModified :Date,
 *          owner: String
 *      } } task
 * @param { { id: task.id, index: index } } rowTaskItem
 * @param {Boolean} isSelected
 * @param {Boolean} isEditable
 * @param {Boolean} isInactive
 * @param {Function} toggleSelectedRow
 * @retuns React Component
 */
const SelectedEditableOrInactive = ({task, editTask, isSelected, isEditable, isInactive, toggleSelectedRowAndEditability}) => {
    return(
        isSelected && isEditable ? (
            <TableCell component="th" scope="row">
                <EditTask editTask={editTask}
                    currentTask={task}
                    toggleSelectedRowAndEditability={() => toggleSelectedRowAndEditability()} />
            </TableCell>
        ) : (
            <TableCell component="th" scope="row" >
                { isInactive ? (
                    <strike>{task.name}</strike>
                ) : (
                    task.name
                )}
            </TableCell>
        )
    );
};

export default SelectedEditableOrInactive;