// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import SharedContext from './SharedContext';
import MailboxList from './MailboxList';

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  'appBar': {
    zIndex: theme.zIndex.drawer + 200,
    height: '100%',
  },
  'drawer': {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 100,
  },
  'drawerPaper': {
    width: drawerWidth,
    marginTop: 100,
  },
  'smallDrawer': {
    marginLeft: 200,
    flexGrow: 2,
  },
}));

/**
 * @return {object} JSX
 */
function MailboxDrawer() {
  const {mailbox, setMailbox, drawerOpen, setDrawerOpen, toggleDrawerOpen,
    numRead, setNumRead, numStars, setNumStars, boxes, setBoxes, starChange} =
    React.useContext(SharedContext);

  const selectMailbox= (mailbox) => {
    setMailbox(mailbox);
    setDrawerOpen(false);
  };

  const classes = useStyles();
  return (
    <SharedContext.Provider value={{mailbox, selectMailbox, numRead, setNumRead,
      numStars, setNumStars, boxes, setBoxes, starChange}} >
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          style={{width: 250}}
        >
          <MailboxList/>
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          style={{width: 250}}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawerOpen}
          ModalProps={{keepMounted: true}}
        >
          <MailboxList/>
        </Drawer>
      </Hidden>
    </SharedContext.Provider>
  );
}

export default MailboxDrawer;

// Sources
// Assignments689 Example
// material-ui.com
