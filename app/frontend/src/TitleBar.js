import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import SharedContext from './SharedContext';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer +100,
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 * @return {oject} JSX
 */
function TitleBar() {
  const {toggleDrawerOpen, setSearch, setSettings, setCompose} =
    React.useContext(SharedContext);
  const handleClickOpen = () => {
    setSearch(true);
  };
  const handleSettingsOpen = () => {
    setSettings(true);
  };
  const handleComposeOpen = () => {
    setCompose(true);
  };
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawerOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.search}>
          <div className={classes.searchIcon}
          >
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onClick={handleClickOpen}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
          />
        </div>
        <IconButton
          color="inherit"
          onClick={handleComposeOpen}
        >
          <MailIcon/>
        </IconButton>
        <Button
          color="inherit"
          onClick={handleSettingsOpen}
        >
          <Avatar alt="CSE183 User"
            src="https://d31u1j2vbx6ya5.cloudfront.net/gei-assets/uploads/2019/08/pro-headshots-photography-tips.jpg"
          />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;

// sources
// https://material-ui.com/components/app-bar/
