import React, { useState, useContext } from 'react';
import Button from '../Button/Button';
import { WebSocketContext } from '../../socketContext';
import './OpeningPage.css';

const OpeningPage = ({setRoom}) => {

    const socket = useContext(WebSocketContext);
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(null);

    const createRoom = () => {
    socket.emit('create room');
    }
    const joinRoom = () => {
    socket.emit('join room');
    socket.on("admit", value => {
        if (value.status) {
            try {
                setRoom(value?.room)
            } catch (error) {
                setError('Can\'t set room code')
            }
        }
        else setError('Room code is invalid');
    });
    }
  const handleChange = e => setRoomCode(e.target.value);
    return(
        <div>
            <div>
                <div>
                <label htmlFor="newRoom">newRoom</label>
                <Button onClick = {createRoom}>
                    New Room
                </Button>
                </div>
                <div>
                <label htmlFor="joinRoom">joinRoom</label>
                <input type="text" onChange = {handleChange}/>
                <Button onClick = {joinRoom}>
                    Join Room
                </Button>
                </div>
            </div>
            {
                error &&
                <p>{error}</p>
            }
        </div>
    );
};

export default OpeningPage;