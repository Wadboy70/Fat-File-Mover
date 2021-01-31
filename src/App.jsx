import './App.css';
import { WebSocketContext } from './socketContext';
import Button from './components/Button/Button';
import { useContext, useEffect } from 'react';

function App() {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
  })

  const createRoom = () => {
    socket.emit('create room','JH547');
  }

  return (
    <div className="App">
      <div>
        <div>
          <label htmlFor="newRoom">newRoom</label>
          <Button variant = 'contained' color = 'primary' onClick = {createRoom}>
            New Room
          </Button>
        </div>
        <div>
          <label htmlFor="joinRoom">joinRoom</label>
          <input type="text"/>
        </div>
      </div>
    </div>
  );
}

export default App;
