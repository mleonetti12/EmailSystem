import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import SharedContext from './SharedContext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/Save';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),

  },
  root: {
    minWidth: 275,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @return {object} JSX
 */
function SettingsDialog() {
  const [chev, setChev] = React.useState(false);
  const classes = useStyles();
  const {settings, setSettings} =
    React.useContext(SharedContext);
  const handleClose = () => {
    setSettings(false);
    setChev(false);
  };
  const handleChevClose = () => {
    setChev(false);
  };
  const handleClickOpen = () => {
    setChev(true);
  };

  return (
    <div>
      <Dialog fullScreen open={settings} onClose={handleClose}
        TransitionComponent={Transition}>
        <Dialog
          open={chev}
          onClose={handleChevClose}
          aria-labelledby="title"
          aria-describedby="desc"
        >
          <DialogTitle id="title">{'You have unsaved changes'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="desc">
              Would you like to save?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Exit without saving
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Save and exit
            </Button>
          </DialogActions>
        </Dialog>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClickOpen}
              aria-label="close">
              <ChevronLeftIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Settings
            </Typography>
            <IconButton edge="start" color="inherit"
              aria-label="save"
              onClick={handleClose}>
              <SaveIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Card className={classes.root}>
              <CardContent align="center">
                <Typography variant="h6" className={classes.title}>
                  CSE183 Student
                </Typography>
                <Avatar alt="CSE183 User"
                  src="https://d31u1j2vbx6ya5.cloudfront.net/gei-assets/uploads/2019/08/pro-headshots-photography-tips.jpg"
                  className={classes.large}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default SettingsDialog;

// Sources
// https://material-ui.com/components/dialogs/
// https://stackoverflow.com/questions/53183297/material-ui-card-will-not-center-react-js
// https://material-ui.com/components/cards/
