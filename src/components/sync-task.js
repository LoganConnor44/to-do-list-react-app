import React from 'react';

/**
 * React create task web component.
 * 
 * @param {function} addTask 
 */
const SyncTask = ({allTasks, syncTask}) => {
    const doesIdExist = (task) => (!('id' in task)) ? task : null;
    const tasksToSync = allTasks.filter(doesIdExist);

    return(
        <button onClick = {() => syncTask(tasksToSync)}>
            Sync To Database
        </button>
    );
};

export default SyncTask;