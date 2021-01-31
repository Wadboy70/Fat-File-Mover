import { useEffect, useState, useContext } from 'react';
import { Switch, Route, useHistory, Redirect, withRouter } from 'react-router-dom'
import { WebSocketContext } from './socketContext';
import OpeningPage from './components/OpeningPage/OpeningPage';
import RoomPage from './components/RoomPage/RoomPage';
import './App.css';

function App() {
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const socket = useContext(WebSocketContext);
  
  const joinRoom = (setError, roomCode) => {
    socket.emit('join room', roomCode);
    
    socket.on("admit join", value => {
      if (value.status) {
          try {
              setRoom(value.room)
          } catch (error) {
              setError('Can\'t set room code')
          }
      }
      else setError('Room code is invalid');
    });
  }
  const redirErr = () => setRoom(null);

  let path = history.location.pathname.replace(/\//,'');

  useEffect(() => {
    if(room && !path.includes(room)){
      history.push(`/${room}`);
    }
  }, [room, history, path])

  return (
    <div className="App">
      <Switch>
        <Route exact path = '/'>
          <OpeningPage joinRoom = { joinRoom } setRoom = {setRoom}/>
        </Route>
        <Route exact path = '/:room'>
          {
            (path === room)?
            <RoomPage room = { room }/>
            :
            joinRoom(redirErr, path) || <Redirect to = '/'/>
          }
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
