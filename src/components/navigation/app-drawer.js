import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';

const AppDrawer = ({isOpen, toggleDrawer}) => {
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
						<ListItemIcon>
							<GetAppIcon />
						</ListItemIcon>
					</ListItem>
				</List>
			</div>	
		</Drawer>
	);
};
export default AppDrawer;