import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TableToolbar from './table-toolbar';
import EditIcon from '@material-ui/icons/Edit';
import SelectedEditableOrInactive from './selected-editable-or-inactive';
import StatusEnum from '../../../util/status-enum';
import '../../../styles/create-task.css';

/**
 * React task web component.
 *  
 * @param { [ {
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
 *      } ]        } tasks
 * @param {Function} completeTask
 * @param {Function} removeTask
 * @param {Function} batchRemoveTasks
 * @param {Function} batchCompleteTasks
 */
const TaskTable = ({tasks, completeTask, removeTask, editTask, batchRemoveTasks, batchCompleteTasks}) => {
    const [selected, setSelected] = useState([{
        id: null, 
        index: null 
    }]);
    const [editable, setEditable] = useState([{
        id: null,
        index: null,
        editability: null
    }]);

    /**
     * Identifies if the passed in row item was the item the user selected.
     * 
     * Create a variable without null elements / initialized elements.
     * Create a variable of elements that have matching ids.
     * Return boolean value if isSelected is not null, undefined, or an empty array.
     * 
     * @param { { id: task.id, index: index } } rowItem 
     * @returns Boolean
     */
    const isRowSelected = rowItem => {
        const nonNullSelectedItems = removeItemsWithNullId(selected);
        const isSelected = nonNullSelectedItems.filter(x => x.id === rowItem.id);
        return isSelected !== null && typeof isSelected !== undefined && isSelected.length !== 0 ? true : false;
    };

    /**
     * Identifies if the passed in row item has been marked as editable by the user.
     * 
     * Create a variable without null elements / initialized elements.
     * Create a variable of elements that have matching ids and has a true value for the editability property.
     * Return boolean value if editableItems is not null, undefined, or an empty array.
     * 
     * @param { { id: task.id, index: index } } rowItem 
     * @returns Boolean
     */
    const isRowEditable = rowItem => { 
        const nonNullEditableItems = removeItemsWithNullId(editable);
        const editableItems = nonNullEditableItems.filter(x => x.id === rowItem.id && x.editability)
        return editableItems !== null && typeof editableItems !== undefined && editableItems.length !== 0 ? true : false;
    };

    /**
     * If the passed in task's status is set to Inactive, return true;
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
     *      } } x 
     * @returns Boolean
     */
    const isRowInactive = x => x.status === StatusEnum.INACTIVE;

    /**
     * If any passed Functions return true the row is identified as highlighted.
     * 
     * All passed Functions return a Boolean value;
     * 
     * @param {Function} x 
     * @param {Function} y 
     * @param {Function} z 
     * @returns Boolean
     */
    const isRowHighlighted = (x, y, z) => x || y || z;

    /**
     * Filters out Objects in an array that have and id of null.
     * 
     * @param {any Object with an index of `id`} elements 
     * @returns Array
     */
    const removeItemsWithNullId = elements => elements.filter(item => item.id !== null);

    /**
     * Toggles the editability value of the React Hook.
     * 
     * Strips the initial null values and sets the values using spread operator.
     * If the row is currently editable - make it uneditable by removing it from the array.
     * If the row is currently uneditable - make it editable by adding it to the array.
     * Reset the React Hook.
     * 
     * @param @param { { id: task.id, index: index } } rowTaskItem
     * @returns void
     */
    const toggleEditability = rowTaskItem => {
        const nonNullExistingItems = removeItemsWithNullId(editable);
        let existingEditableItems = [...nonNullExistingItems];
        if (isRowEditable(rowTaskItem)) {
            existingEditableItems.splice(
                existingEditableItems.indexOf(editable.find( x => x.id === rowTaskItem.id)),
                1
            );
        } else {
            existingEditableItems.push({
                id: rowTaskItem.id,
                index: rowTaskItem.index,
                editability: true
            });
        }
        setEditable(existingEditableItems);
    };

    /**
     * Toggles the selected value of the React Hook.
     * 
     * Strips the initial null values and sets the values using spread operator.
     * If the row is currently selected - make it unselected by removing it from the array.
     * If the row is currently selected - check if the row is editable - if it is make it uneditable.
     * If the row is currently unselected - make it selected by adding it to the array.
     * Reset the React Hook.
     * 
     * @param { { id: task.id, index: index } } rowTaskItem
     * @returns void
     */
    const toggleSelectedRow = rowTaskItem => {
        const nonNullExistingItems = removeItemsWithNullId(selected);
        let existingSelectedItems = [...nonNullExistingItems];
        if (isRowSelected(rowTaskItem)) {
            existingSelectedItems.splice(
                existingSelectedItems.indexOf(selected.find( x => x.id === rowTaskItem.id)),
                1
            );
            if (isRowEditable(rowTaskItem)) {
                toggleEditability(rowTaskItem);
            }
        } else {
            existingSelectedItems.push(rowTaskItem);
        }
        setSelected(existingSelectedItems);
    };

    return (
        <div>
            <TableToolbar selected={selected}
                setSelected={setSelected}
                removeTask={removeTask}
                completeTask={completeTask}
                batchRemoveTasks={batchRemoveTasks}
                batchCompleteTasks={batchCompleteTasks} />
            
            <Table aria-label="task table">
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
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
                            const isItemEditable = isRowEditable(rowTaskItem);
                            const isItemInactive = isRowInactive(task);
                            const isItemHighlighted = isRowHighlighted(isItemSelected, isItemEditable, isItemInactive);

                            return (
                                <TableRow key={index} 
                                    hover
                                    selected={isItemHighlighted} 
                                    className="table-row">
                                    <SelectedEditableOrInactive
                                        task={task}
                                        editTask={editTask}
                                        isSelected={isItemSelected}
                                        isEditable={isItemEditable}
                                        isInactive={isItemInactive}
                                        toggleSelectedRow={() => toggleSelectedRow(rowTaskItem)} />
                                    
                                    {isItemSelected ? (
                                        <TableCell padding="checkbox" 
                                            scope="row" 
                                            onClick={() => toggleEditability(rowTaskItem)} >
                                            <Tooltip title="Edit" >
                                                <IconButton aria-label="edit">
                                                    <EditIcon  />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    ) : (
                                        <TableCell padding="checkbox" scope="row"></TableCell>
                                    )}
                                    <TableCell padding="checkbox" 
                                        scope="row" 
                                        onClick={() => toggleSelectedRow(rowTaskItem)} >
                                        <Checkbox checked={isItemSelected} />
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