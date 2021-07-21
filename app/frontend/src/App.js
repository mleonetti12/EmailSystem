// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchDialog from './SearchDialog';
import SettingsDialog from './SettingsDialog';
import ComposeDialog from './ComposeDialog';
import MailboxDialog from './MailboxDialog';
import SharedContext from './SharedContext';
import TitleBar from './TitleBar';
import Content from './Content';
import MailboxDrawer from './MailboxDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // const [dummy, setDummy] = React.useState('');
  const [mailbox, setMailbox] = React.useState('Inbox');
  // const [currentEmail, setCurrent] = React.useState(null);
  const [numStars, setNumStars] = React.useState(0);
  const [numRead, setNumRead] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [boxes, setBoxes] = React.useState([]);
  const [search, setSearch] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [compose, setCompose] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [starChange, setStar] = React.useState(true);
  window.addEventListener('resize', () => {
    setDrawerOpen(false);
  });

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <SharedContext.Provider value= {{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen,
        numStars, setNumStars,
        numRead, setNumRead,
        boxes, setBoxes,
        search, setSearch,
        view, setView,
        starChange, setStar,
        settings, setSettings,
        compose, setCompose,
      }}
      >
        <ComposeDialog/>
        <SettingsDialog/>
        <MailboxDialog/>
        <SearchDialog/>
        <MailboxDrawer/>
        <TitleBar/>
        <Content/>
      </SharedContext.Provider>
    </div>
  );
}


export default App;

// Sources
// Assignments689 Example
// material-ui.com
