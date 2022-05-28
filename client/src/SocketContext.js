import React, {createContext, useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ( {children}) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState(null);
    const [call, setCall] = useState({});
    const [callStarted, setCallStarted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() =>{
        navigator.mediaDevices.getuserMedia({video: true, audio: false})
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            })

        socket.on('me', (id) => setMe(id))
    })
    
    const startCall = () => {
        setCallStarted(true);

        const peer = new Peer({initiator: false, trickle: false, stream})

        peer.on('signal', (data) => {
            socket.emit('startCall', {signal: data});
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        connectionRef.current = peer;
    }

    const leaveCall = () => {

    }
}