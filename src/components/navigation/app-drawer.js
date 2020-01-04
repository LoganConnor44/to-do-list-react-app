import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';
import AddToHomescreenPrompt from '../pwa/add-to-homescreen-prompt';

const AppDrawer = ({isOpen, toggleDrawer}) => {

	const [prompt, promptToInstall] = AddToHomescreenPrompt();

	/**
     * Determines if the prompt is false or anything else.
     * Prompt may be an object such as { isTrusted: boolean }
     */
	const promptEventIsReady = () => prompt !== false ? prompt : false;

	const installViaSideBar = () => {
		if (promptEventIsReady()) {
			promptToInstall();
		}
	};

	return(
		<Drawer open={isOpen}
			onClose={toggleDrawer} >
			<div>
				<List>
					<ListItem>
						<ListItemIcon>
							<FaceIcon />
						</ListItemIcon>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem>
						<ListItemIcon onClick={installViaSideBar}>
							<GetAppIcon />
						</ListItemIcon>
					</ListItem>
				</List>
			</div>
		</Drawer>
	);
};
export default AppDrawer;