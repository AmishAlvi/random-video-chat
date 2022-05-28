import React, {useContext} from 'react'
import {Grid , Typography, Paper} from '@mui/material'
import { SocketContext } from '../SocketContext';


const VideoPlayer = () => {
    const {callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext);
  return (
   <Grid container>
       <Paper>
           <Grid item xs={12} md={6}>
               <Typography variant="h5" gutterBottom> Name: </Typography>
               <video playsInline muted ref={myVideo} autoPlay />
           </Grid>
       </Paper>
       <Paper>
           <Grid item xs={12} md={6}>
               <Typography variant="h5" gutterBottom> Name: </Typography>
               <video playsInline ref={userVideo} autoPlay />
           </Grid>
       </Paper>
   </Grid>
  )
}

export default VideoPlayer