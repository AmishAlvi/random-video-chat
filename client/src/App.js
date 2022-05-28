import React from 'react'
import { Typography, AppBar } from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'


const App = () => {
  return (
    <div>
        <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center"> Random Video Chat App </Typography>
        </AppBar>
        <>
        <VideoPlayer />
        </>
    </div>
  )
}

export default App