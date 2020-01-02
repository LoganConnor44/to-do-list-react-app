import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import Dexie from 'dexie';
import TaskTable from './task-table';
import CreateTask from './create-task';
import SyncTask from './sync-task';
import StatusEnum from '../util/status-enum';
import DifficultyEnum from '../util/difficulty-enum';
import ImportanceEnum from '../util/importance-enum';
import NavigationBar from './navigation-bar';
import UseAddToHomescreenPrompt from './add-to-homescreen';
import '../styles/to-do.css';

const InstallPwa = () => {
    const [prompt, promptToInstall] = UseAddToHomescreenPrompt();
    const [isAddToHomescreenVisible, setIsAddToHomescreenVisible] = useState(false);
    const hideAddToHomescreen = () => setIsAddToHomescreenVisible(false);
    const installAndHideMessage = () => {
        hideAddToHomescreen();
        promptToInstall();
    };
    
    useEffect(() => {
        if (prompt) {
            setIsAddToHomescreenVisible(true);
        }
    }, [prompt]);

    const message = "Click here to download this app.";

    return ( 
        isAddToHomescreenVisible &&
            <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    
                }}
                open={isAddToHomescreenVisible}
                autoHideDuration={3000}  >
                <SnackbarContent message={
                    <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <InfoIcon style={{marginRight: 4}} />
                    {message}
                    </div>
                    } 
                    style={{backgroundColor: '#43a047'}}
                    action={
                        <div>
                            <IconButton key="close" aria-label="close" onClick={installAndHideMessage} >
                                <GetAppIcon />
                            </IconButton>
                            <IconButton key="close" aria-label="close" onClick={hideAddToHomescreen} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    } />
            </Snackbar>
    );
}

/**
 * Main To Do application component.
 */
const Todo = () => {
    const db = new Dexie("ToDoDb");
    db.version(2).stores({tasks: `++id`});
    
    const [hasError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [tasksRemaining, setTasksRemaining] = useState(0);

    
    

    /**
     * Retrieves data from mock api.
     */
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get("http://localhost:8080/to-do/goal/1");
    //             console.log(response.data);
    //             setTasks([response.data]);
    //         } catch(error) {
    //             setError(true);
    //         }
    //         setIsLoading(false);
    //     };
    //     fetchData();
    // }, []);

    /**
     * Updates setTasksRemaining anytime there is a change to `tasks`
     */
    useEffect(() => {
        setTasksRemaining(tasks.filter(task => task.status === StatusEnum.ACTIVE).length);
    }, [tasks]);

    useEffect(() => {
        const fetchBrowserData = async () => {
            setIsLoading(true);
            try {
                db.tasks.toArray().then(x => setTasks(x));
            } catch(error) {
                setError(true);
            }
            setIsLoading(false);
        };
        fetchBrowserData();
    // eslint-disable-next-line
    }, []);

    /**
     * Adds a new task and defaults it to not complete.
     * 
     * @param {String} title 
     */
    const addTask = name => {
        const newUserTask = { 
            name: name,
            status: StatusEnum.ACTIVE,
            created: Date.now(),
            deadline: null,
            description: null,
            diffculty: DifficultyEnum.NORMAL,
            importance: ImportanceEnum.MEDIUM,
            lastModified: null,
            owner: "Logan Connor"
        };
        const newTasks = [
            ...tasks,
            newUserTask
        ];
        setTasks(newTasks);
        db.tasks.put(newUserTask)
    };

    /**
     * Sets an existing task to completed.
     * 
     * @param { {id: integer, index: integer} } selectedTask
     */
    const completeTask = selectedTask => {
        const existingTasks = toggleTaskStatusIndicator([selectedTask]);
        db.tasks.update(selectedTask.id, {status: existingTasks[selectedTask.index].status});
    };

    /**
     * Edits an existing task's name.
     * 
     * @todo this param is not correct
     * @param { {id: integer, index: integer} } selectedTask
     */
    const editTask = updatedTask => {
        updateEditedTasks(updatedTask);
        db.tasks.update(updatedTask.id, {name: updatedTask.name});
    };

    const updateEditedTasks = updatedTask => {
        const existingTasks = [...tasks];
        existingTasks.map(task => {
            if (updatedTask.id === task.id) {
                task.name = updatedTask.name;
            }
        });
        setTasks(existingTasks);
    };

    /**
     * Toggles a task's status enum.
     * 
     * Retrieves the existing tasks.
     * Iterates through the passed in selected tasks and sets the appropriate status.
     * Sets the tasks to the updated ones.
     * Returns the updated tasks.
     * @param { [ {id: integer, index: integer} ] } selectedTasks 
     * @returns { [ {id: integer, index: integer} ] }
     */
    const toggleTaskStatusIndicator = selectedTasks => {
        const existingTasks = [...tasks];
        selectedTasks.forEach(task => {
            if (existingTasks[task.index].status === StatusEnum.INACTIVE) {
                existingTasks[task.index].status = StatusEnum.ACTIVE;
            } else if (existingTasks[task.index].status === StatusEnum.ACTIVE) {
                existingTasks[task.index].status = StatusEnum.INACTIVE;
            }
        });
        setTasks(existingTasks);
        return existingTasks;
    }

    /**
     * Removes an existing task from the application state.
     * 
     * @param { {id: integer, index: integer} } selectedTask 
     */
    const removeTask = selectedTask => {
        const existingTasks = [...tasks];
        existingTasks.splice(selectedTask.index, 1);
        setTasks(existingTasks);
        console.log(`the selected task id is: ${selectedTask.id}`)
        db.tasks.where("id").equals(selectedTask.id).delete()
    };

    const batchRemoveTasks = selectedTasks => {
        const keysToDelete = selectedTasks.map(x => x.id);
        db.transaction('rw', db.tasks, async () => {
            db.tasks.bulkDelete(keysToDelete);
            db.tasks.toArray().then(x => setTasks(x));
        }).then(() => {
            console.info(`The selected tasks, ${JSON.stringify(selectedTasks)}, were saved to the browser db.`);
        }).catch(err => {
            console.debug(`There was an error when removing the selected tasks, ${JSON.stringify(selectedTasks)}, from the browser db.`);
            console.error(err.stack);
        });
    };

    const batchCompleteTasks = selectedTasks => {
        const existingTasks = toggleTaskStatusIndicator(selectedTasks);        
        
        db.transaction('rw', db.tasks, async () => {
            selectedTasks.forEach(task => {
                db.tasks.update(task.id, {status: existingTasks[task.index].status});
            });
            db.tasks.toArray().then(x => setTasks(x));
        }).then(() => {
            console.info(`The selected tasks, ${JSON.stringify(selectedTasks)}, were set as complete in the browser db.`);
        }).catch(err => {
            console.debug(`There was an error when updating the selected tasks, ${JSON.stringify(selectedTasks)}, to the browser db.`)
            console.error(err.stack);
        });
    };

    const syncTask = tasksToSync => {
        console.log(tasksToSync);
        const syncData = async () => {
            setIsLoading(true);
            for (let i = 0; i < tasksToSync.length; i++) {
                const response = await axios.post("http://localhost:8080/to-do/goal", tasksToSync[i]).then(response => {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
                //setTasks([response.data]);
            }
            setIsLoading(false);
        };
        syncData();
        return;
    };

    return(
        <app-root-styling>

            <div>
                <NavigationBar />
            </div>

            

            <InstallPwa />

            <app-content-styling>
                <Grid container 
                    spacing={3} 
                    alignItems="center"
                    justify="center">
                    <Grid item xs={10}>
                        <grid-content-styling>
                            <Paper style={{padding: '16px'}}>
                                <Typography variant="h6" gutterBottom>
                                        {tasksRemaining} Active Tasks
                                    </Typography>

                                    {hasError && <div>Something went wrong ...</div>}

                                    {!isLoading && tasks ?
                                        <TaskTable tasks={tasks}
                                            completeTask = {completeTask}
                                            removeTask = {removeTask} 
                                            editTask = {editTask}
                                            batchRemoveTasks = {batchRemoveTasks} 
                                            batchCompleteTasks = {batchCompleteTasks} /> :
                                        <div>Loading ...</div>
                                    }

                                <div className = "create-task">
                                    <CreateTask addTask = {addTask} />
                                </div>
                            </Paper>
                        </grid-content-styling>
                        
                        <div>
                            <SyncTask allTasks = {tasks} 
                                syncTask = {syncTask} />
                        </div>
                    </Grid>
                </Grid>
            </app-content-styling>

        </app-root-styling>
    );
};

export default Todo;