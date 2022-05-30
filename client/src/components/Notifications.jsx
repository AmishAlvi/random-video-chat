import React, { useContext } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted} = useContext(SocketContext);

  return (
    <>
      {(call.isReceivingCall && !callAccepted) ? (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="body1"> You are about to be connected with another, make sure not to share any critical personal details</Typography>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Connect Me!
          </Button>
        </div>
      ): 
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <CircularProgress />
          <Typography variant="body1"> Searching For Avaiable Users for connection</Typography>
        </div>}
    </>
  );
};

export default Notifications;