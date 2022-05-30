import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    // },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    justifyContent: 'center',
    // [theme.breakpoints.down('xs')]: {
    //   width: '80%',
    // },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));



const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, searching, setSearching } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  const initiateCall = () => {
    setSearching(true);

    callUser(idToCall)
  }


  return (
    <Container className={classes.container}>
      <Paper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid item xs={6} md={6}>
              <Typography>Make sure your camera and microphone are working as intended and click start below to start chatting</Typography>
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={initiateCall}>
                  Start
                </Button>
              )}
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;