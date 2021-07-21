// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
 * @return {object} JSX
 */
function SearchDialog() {
  const classes = useStyles();
  const {search, setSearch} =
    React.useContext(SharedContext);
  const handleClose = () => {
    setSearch(false);
  };

  return (
    <div>
      <Dialog fullScreen open={search} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}
              aria-label="close">
              <ChevronLeftIcon/>
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}
              >
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
              />
            </div>
            <IconButton edge="start" color="inherit"
              aria-label="stop">
              <CloseIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Emails go here"/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="More emails"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default SearchDialog;

// Sources
// https://material-ui.com/components/dialogs/
