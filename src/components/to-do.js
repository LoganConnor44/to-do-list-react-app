import React, { useState, useEffect } from 'react';
import Task from './task';
import CreateTask from './create-task';
import SyncTask from './sync-task';
import StatusEnum from '../util/status-enum';
import DifficultyEnum from '../util/difficulty-enum';
import ImportanceEnum from '../util/importance-enum';
import axios from 'axios';
import './to-do.css';

/**
 * Main To Do application component.
 */
const Todo = () => {
    const [hasError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [tasksRemaining, setTasksRemaining] = useState(0);

    /**
     * Retrieves data from mock api.
     */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/to-do/goal/1");
                console.log(response.data);
                setTasks([response.data]);
            } catch(error) {
                setError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Updates setTasksRemaining anytime there is a change to `tasks`
     */
    useEffect(() => {
        setTasksRemaining(tasks.filter(task => task.status === StatusEnum.ACTIVE).length);
    }, [tasks]);
    

    /**
     * Adds a new task and defaults it to not complete.
     * 
     * @param {String} title 
     */
    const addTask = name => {
        const newTasks = [
            ...tasks,
            { 
                name,
                status: StatusEnum.ACTIVE,
                created: Date.now(),
                deadline: null,
                description: null,
                diffculty: DifficultyEnum.NORMAL,
                importance: ImportanceEnum.MEDIUM,
                lastModified: null,
                owner: "Logan Connor"
            }
        ];
        setTasks(newTasks);
    };

    /**
     * Sets an existing task to completed.
     * 
     * @param {Integer} index 
     */
    const completeTask = index => {
        const existingTasks = [...tasks];
        existingTasks[index].status = StatusEnum.INACTIVE;
        setTasks(existingTasks);
    };

    /**
     * Removes an existing task from the application state.
     * 
     * @param {Integer} index 
     */
    const removeTask = index => {
        const existingTasks = [...tasks];
        existingTasks.splice(index, 1);
        setTasks(existingTasks);
    };

    const syncTask = tasksToSync => {
        console.log(tasksToSync);
        const syncData = async () => {
            setIsLoading(true);
            try {
                for (let i = 0; i < tasksToSync.length; i++) {
                    const response = await axios.post("http://localhost:8080/to-do/goal", tasksToSync);
                    console.log(response.data);
                    setTasks([response.data]);
                }
            } catch(error) {
                setError(true);
            }
            setIsLoading(false);
        };
        syncData();
        return;
    };

    return(
        <div className="todo-container">
            <div className="header">
                Pending Tasks ({tasksRemaining})
            </div>
            {hasError && <div>Something went wrong ...</div>}
            <div className="tasks">
                {
                    !isLoading && tasks ? (
                        tasks.map((task, index) => (
                            <Task task={task}
                                index={index}
                                key={index}
                                completeTask = {completeTask}
                                removeTask = {removeTask} />
                        ))    
                    ) : (
                        <div>Loading ...</div>
                    )
                }
            </div>
            <div className = "create-task">
                <CreateTask addTask = {addTask} />
            </div>
            <div>
                <SyncTask allTasks = {tasks} 
                    syncTask = {syncTask} />
            </div>
        </div>
    );
};

export default Todo;