// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import SharedContext from './SharedContext';
import Typography from '@material-ui/core/Typography';
import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/**
 * func to display date format
 * @return {string} formatted date
 * @param {d} d string to pass
 */
function dispDate(d) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(d);
  if (new Date().getFullYear()==date.getFullYear()) {
    if (new Date().getMonth()==date.getMonth()) {
      if (new Date().getDate()==date.getDate()) {
        let mins = date.getMinutes();
        if (mins < 10) {
          mins = '0' + date.getMinutes();
        }
        return (date.getHours()+':'+mins);
      } else if (new Date().getDate()==date.getDate()+1) {
        return ('Yesterday');
      }
    }
    return (months[date.getMonth()]+' '+date.getDate());
  }
  return date.getFullYear();
}


const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

/**
 * Simple component with no state.
 * @param {string} id
 * @param {string} mailbox current mailbox
 * @param {boolean} starChange
 * @param {function} setStar
 */
async function toggleStarred(id, mailbox, starChange, setStar) {
  const mailbox2 = mailbox.toLowerCase();
  const url = 'http://localhost:3010/v0/mail/' +
  id + '?mailbox=' + mailbox2 + '&starred=1';
  await axios.put(url, {})
      .catch((error) =>{
        console.error(error);
      });
  setStar(!starChange);
}

/**
 * Simple component with no state.
 *
 * @param {string} mailbox current mailbox
 * @param {function} setMail
 * @param {int} numStars
 * @param {function} setNumStars
 * @param {int} numRead
 * @param {function} setNumRead
 * @param {array} boxes
 * @param {function} setBoxes
 * @return {object} json
 */
function getMail(mailbox, setMail) {
  const url = 'http://localhost:3010/v0/mail?mailbox=' + mailbox;
  return fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const arr = jsonData[0].mail.sort(function(a, b) {
          return new Date(b.received) - new Date(a.received);
        });
        setMail(arr);
      })
      .catch((error) => {
        console.error(error);
      });
}

/**
 * @return {object} JSX
 */
function Content() {
  const [mail, setMail] = React.useState([]);
  // const [starChange, setStar] = React.useState(true);
  const {mailbox, setView, starChange, setStar} =
    React.useContext(SharedContext);
  const classes = useStyles();
  React.useEffect(() => {
    getMail(mailbox.toLowerCase(), setMail);
  }, [mailbox, starChange]);
  const handleClickOpen = () => {
    setView(true);
  };
  return (
    <Paper className={classes.paper}>
      <Toolbar/>
      <h3>{mailbox}</h3>
      <List>
        {mail.map((email) => (
          <ListItem button key={email.id} divider={true}
            onClick={handleClickOpen}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp"
                src={email.avatar}/>
            </ListItemAvatar>
            <ListItemText primary={
              <React.Fragment>
                <Grid container justify="space-between">
                  <Typography>
                    <Box fontWeight={
                      email.read ? 'fontWeightRegular' : 'fontWeightBold'}>
                      {email.from.name}
                    </Box>
                  </Typography>
                  <Typography align="right" style={{fontSize: '10px'}}>
                    {dispDate(email.received)}
                  </Typography>
                </Grid>
              </React.Fragment>
            }
            secondary= {
              <React.Fragment>
                <Typography style={{fontSize: '14px'}}>
                  <Box fontWeight={
                    email.read ? 'fontWeightRegular' : 'fontWeightBold'}>
                    {email.subject}
                  </Box>
                </Typography>
                <Typography align="left" style={{fontSize: '12px'}}>
                  {email.content}
                </Typography>
              </React.Fragment>
            }
            />
            <ListItemSecondaryAction>
              <IconButton align="right" edge="end" aria-label="star"
                onClick = {() =>
                  toggleStarred(email.id, mailbox, starChange, setStar)
                }>
                {email.starred? <StarIcon style={{fontSize: '20px'}}/> :
                <StarBorder style={{fontSize: '20px'}}/>}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Content;

// sources
// https://stackoverflow.com/questions/39019094/reactjs-get-json-object-data-from-an-url
// https://stackoverflow.com/questions/56248358/align-typography-component-to-the-right
// https://material-ui.com/
// https://stackoverflow.com/questions/58257228/how-to-switch-materialui-icon-when-clicked
