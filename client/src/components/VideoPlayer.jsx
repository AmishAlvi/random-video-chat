import React, { useContext} from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';


import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    minWidth: '640px',
    // [theme.breakpoints.down('xs')]: {
    //   width: '300px',
    // },
  },
  gridContainer: {
    justifyContent: 'center',
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    // },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
    minWidth: '640px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      { console.log(stream) }
      {
        
      stream !== undefined ? (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>You</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      ): null}
      {(callAccepted && !callEnded) ?(
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Other'}</Typography>
            <video className={classes.video} playsInline ref={userVideo} autoPlay/>
          </Grid>
        </Paper>
      ) : 
      <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom> your partner will appear here </Typography>
          </Grid>
        </Paper>}
    </Grid>
  );
};

export default VideoPlayer;