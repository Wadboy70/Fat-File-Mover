import React, { useState, useContext, useEffect } from 'react';
import Button from '../Button/Button';
import { WebSocketContext } from '../../socketContext';
import './OpeningPage.css';

const OpeningPage = ({joinRoom, setRoom}) => {

    const socket = useContext(WebSocketContext);
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(null);

    const createRoom = () => {
        console.log('creating room')
        socket.emit('create room');
        
        socket.on("admit create", value => {
            if (value.status) {
                try {
                    setRoom(value.room)
                } catch (error) {
                    setError('Can\'t set room code')
                }
            }
            else setError('Room code is invalid');
      });
    };

    useEffect(()=>{
        console.log(error)
    },[error])
    
  const handleChange = e => setRoomCode(e.target.value);
    return(
        <div className = 'opening'>
            <div className = 'openingBox'>
                <form className = 'roomChoice' onSubmit = {e => e.preventDefault()}>
                    <label htmlFor="newRoom">newRoom</label>
                    <Button onClick = {createRoom}>
                        New Room
                    </Button>
                </form>
                <form className = 'roomChoice joinRoom' onSubmit = {e => e.preventDefault()}>
                    <div>
                        <label htmlFor="joinRoom">joinRoom</label>
                        <input type="text" onChange = {handleChange}/>
                    </div>
                    <Button onClick = {() => joinRoom(setError, roomCode)}>
                        Join Room
                    </Button>
                </form>
            </div>
            {
                error &&
                <p>{error}</p>
            }
        </div>
    );
};

export default OpeningPage;