import React, { useState, useEffect } from 'react';

const UseAddToHomescreenPrompt = () => {
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
}

export default UseAddToHomescreenPrompt;