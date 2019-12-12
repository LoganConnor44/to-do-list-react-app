import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TaskTable from './task-table';

import CreateTask from './create-task';
import SyncTask from './sync-task';
import StatusEnum from '../util/status-enum';
import DifficultyEnum from '../util/difficulty-enum';
import ImportanceEnum from '../util/importance-enum';
import axios from 'axios';
import Dexie from 'dexie';
import NavigationBar from './navigation-bar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
      },
      content: {
          margin: 25
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
      }
}));

/**
 * Main To Do application component.
 */
const Todo = () => {
    const classes = useStyles();

    const db = new Dexie("ToDoDb");
    db.version(1).stores({goals: `++id`});

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
                db.goals.toArray().then(x => setTasks(x));
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
            name,
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
        db.goals.put(newUserTask)
    };

    /**
     * Sets an existing task to completed.
     * 
     * @param {Integer} index 
     */
    const completeTask = (index, task) => {
        const existingTasks = [...tasks];
        existingTasks[index].status = StatusEnum.INACTIVE;
        setTasks(existingTasks);
        db.goals.update(task.id, {status: StatusEnum.INACTIVE});
    };

    /**
     * Removes an existing task from the application state.
     * 
     * @param {Integer} index 
     */
    const removeTask = (index, task) => {
        const existingTasks = [...tasks];
        existingTasks.splice(index, 1);
        setTasks(existingTasks);
        db.goals.where("id").equals(task.id).delete()
    };

    const syncTask = tasksToSync => {
        console.log(tasksToSync);
        const syncData = async () => {
            setIsLoading(true);
            for (let i = 0; i < tasksToSync.length; i++) {
                const response = await axios.post("http://localhost:8080/to-do/goal", tasksToSync[i]).then(function (response) {
                    console.log(response);
                    })
                    .catch(function (error) {
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
        <div className={classes.root}>

            <div>
                <NavigationBar />
            </div>

            <div className={classes.content}>

                <Grid container 
                    spacing={3} 
                    alignItems="center"
                    justify="center">
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>
                            <Typography variant="h2" gutterBottom>
                                    Pending Tasks ({tasksRemaining})
                                </Typography>

                                {hasError && <div>Something went wrong ...</div>}

                                {!isLoading && tasks ?
                                    <TaskTable tasks={tasks}
                                        completeTask = {completeTask}
                                        removeTask = {removeTask} /> :
                                    <div>Loading ...</div>
                                }

                            <div className = "create-task">
                                <CreateTask addTask = {addTask} />
                            </div>
                        </Paper>
                        <div>
                            <SyncTask allTasks = {tasks} 
                                syncTask = {syncTask} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Todo;