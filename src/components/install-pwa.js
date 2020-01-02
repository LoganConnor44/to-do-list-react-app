import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddToHomescreenPrompt from './add-to-homescreen-prompt';

/**
 * React web component to install the WebApk or a web shortcut to the user's homescreen.
 */
const InstallPwa = () => {
    const [prompt, promptToInstall] = AddToHomescreenPrompt();
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
                autoHideDuration={3000} >
                <SnackbarContent message={
                    <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }} >
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
};

export default InstallPwa;