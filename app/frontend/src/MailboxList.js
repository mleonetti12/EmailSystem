// Maxwell Leonetti mleonett@ucsc.edu

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import SharedContext from './SharedContext';
import ListSubheader from '@material-ui/core/ListSubheader';
import {makeStyles} from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';

const boxesLoc = [
  {name: 'Sent', icon: <ArrowForwardIcon/>},
  {name: 'Trash', icon: <DeleteIcon/>},
];

const useStyles = makeStyles((theme) => ({
  smallDrawer: {
    marginLeft: 0,
    flexGrow: 4,
    marginTop: 30,
  },
}));

/**
 * @param {string} box
 * @param {array} numRead
 * @param {array} boxes
 * @param {boolean} readChange
 * @param {function} setUpread
 * @return {int} numRead
 */
function displayUnread(box, numRead, boxes, readChange, setUpread) {
  let boxInd=0;
  for (let i=0; i<boxes.length; i++) {
    if (boxes[i]==box) {
      boxInd=i;
    }
  }
  return numRead[boxInd];
}

/**
 * @param {array} boxes
 * @param {function} setBoxes
 * @param {array} numRead
 * @param {function} setNumRead
 * @param {array} numStars
 * @param {function} setNumStars
 * @return {object} json
 */
function getMailAmts(boxes, setBoxes, numRead, setNumRead, numStars,
    setNumStars) {
  const url = 'http://localhost:3010/v0/mail';
  return fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const temp = [];
        const cont = [];
        let addStars = 0;
        for (let i=0; i<jsonData.length; i++) {
          temp.push(jsonData[i].name);
          // setBoxes([...boxes, jsonData[i].name]);
          let addRead = 0;
          for (let j=0; j<jsonData[i].mail.length; j++) {
            if (jsonData[i].mail[j].starred) {
              addStars++;
            }
            if (!(jsonData[i].mail[j].read)) {
              addRead++;
            }
          }
          cont.push(addRead);
        }
        setBoxes(boxes.concat(temp));
        setNumRead(numRead.concat(cont));
        setNumStars(addStars);
      })
      .catch((error) => {
        console.error(error);
      });
}

/**
 * @return {object} JSX
 */
function MailboxList() {
  const {mailbox, selectMailbox, numRead, setNumRead, numStars, setNumStars,
    boxes, setBoxes, starChange} =
    React.useContext(SharedContext);
  React.useEffect(() => {
    getMailAmts(boxes, setBoxes, numRead, setNumRead, numStars, setNumStars);
  }, [starChange]);
  const [readChange, setUpread] = React.useState(true);
  const classes = useStyles();
  return (
    <div>
      <List className={classes.smallDrawer}
        style={{width: 250}}
      >
        <ListSubheader>
          <Typography>
            CSE183 Mail
          </Typography>
        </ListSubheader>
        <ListItem button
          key={'Inbox'}
          disabled={mailbox == 'Inbox'}
          onClick={() => selectMailbox('Inbox')}
        >
          <ListItemIcon>
            <MailIcon/>
          </ListItemIcon>
          <ListItemText primary={
            <React.Fragment>
              <Grid container justify="space-between">
                <Typography>
                  {'Inbox'}
                </Typography>
                <Typography align="right" style={{fontSize: '10px'}}>
                  {displayUnread('inbox', numRead, boxes,
                      readChange, setUpread)}
                </Typography>
              </Grid>
            </React.Fragment>
          }/>
        </ListItem>
        <Divider/>
        {boxesLoc.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => selectMailbox(box.name)}
          >
            <ListItemIcon>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={
              <React.Fragment>
                <Grid container justify="space-between">
                  <Typography>
                    {box.name}
                  </Typography>
                  <Typography align="right" style={{fontSize: '10px'}}>
                    {displayUnread(box.name.toLowerCase(), numRead, boxes,
                        readChange, setUpread)}
                  </Typography>
                </Grid>
              </React.Fragment>
            }/>
          </ListItem>
        ))}
        <ListItem button
          key={'Starred'}
          disabled={false}
        >
          <ListItemIcon>
            <StarIcon/>
          </ListItemIcon>
          <ListItemText primary={
            <React.Fragment>
              <Grid container justify="space-between">
                <Typography>
                  {'Starred'}
                </Typography>
                <Typography align="right" style={{fontSize: '10px'}}>
                  {numStars}
                </Typography>
              </Grid>
            </React.Fragment>
          }/>
        </ListItem>
        <Divider/>
      </List>
    </div>
  );
}

export default MailboxList;

// Sources
// Assignments689 Example
