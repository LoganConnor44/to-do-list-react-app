import { useState, useEffect } from 'react';

/**
 * Prompts the user to install the application.
 */
const AddToHomescreenPrompt = () => {
    const [prompt, setPrompt] = useState(null);

    const promptToInstall = () => {
        if (prompt) {
            return prompt.prompt();
        }
        return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'));
    };

    useEffect(() => {
        const ready = (event) => {
            event.preventDefault();
            setPrompt(event);
        };
        window.addEventListener("beforeinstallprompt", ready);
        return () => {
            window.removeEventListener("beforeinstallprompt", ready);
        };
    }, []);

    return [prompt, promptToInstall];
};

export default AddToHomescreenPrompt;