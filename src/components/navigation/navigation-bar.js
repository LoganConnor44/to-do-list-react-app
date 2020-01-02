import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppDrawer from './app-drawer';
import '../../styles/navigation-bar.css';

const NavigationBar = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

	const toggleDrawer = event => {
		console.log(`${event.currentTarget}`)
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(!isDrawerOpen);
    };

	const searchIconClick = () => {
		setIsSearchIconClicked(!isSearchIconClicked);
	};

	return (
			<AppBar style={{position: 'sticky'}}>
				<Toolbar>
					<container-left>
						<hamburger-styling>
							<IconButton color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer} >
								<MenuIcon />
								</IconButton>
								<AppDrawer isOpen={isDrawerOpen}
									toggleDrawer={toggleDrawer} />
							
						</hamburger-styling>
						<title-styling>
							<Typography variant="h6" noWrap>
								PWA To Do App
						</Typography>
						</title-styling>
					</container-left>
					<container-right>
						{
							isSearchIconClicked === false ? (
								<search-icon-styling>
									{/* below classes taken from raw, inspecting html - could not get icons to match*/}
									<div className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit">
										<SearchIcon onClick={searchIconClick} />
									</div>
								</search-icon-styling>
							) : (
									<ClickAwayListener onClickAway={searchIconClick} >
										<search-input-styling>
											<InputBase
												autoFocus
												placeholder="Search…"
												inputProps={{ 'aria-label': 'search' }}
												className="rootInput" />
										</search-input-styling>
									</ClickAwayListener>
								)
						}
					</container-right>
				</Toolbar>
			</AppBar>
	);
}

export default NavigationBar;