// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import SharedContext from './SharedContext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @return {object} JSX
 */
function MailboxDialog() {
  const classes = useStyles();
  const {view, setView, mailbox} =
    React.useContext(SharedContext);
  const handleClose = () => {
    setView(false);
  };

  return (
    <div>
      <Dialog fullScreen open={view} onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}
              aria-label="close">
              <ChevronLeftIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Mail Viewer
            </Typography>
            <IconButton edge="start" color="inherit"
              aria-label="return">
              <MailOutlineIcon/>
            </IconButton>
            <IconButton edge="start" color="inherit"
              aria-label="expand">
              <ExpandMoreIcon/>
            </IconButton>
            <IconButton edge="start" color="inherit"
              aria-label="junk">
              <DeleteOutlineIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary={mailbox}/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default MailboxDialog;

// Sources
// https://material-ui.com/components/dialogs/
