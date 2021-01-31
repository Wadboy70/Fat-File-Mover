import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import OpeningPage from './components/OpeningPage/OpeningPage';

function App() {
  const history = useHistory();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    if(room)
      history.push(room);
  }, [room, history])
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/'>
          <OpeningPage setRoom = { setRoom }/>
        </Route>
        {/* <Route exact path = '/:room' component = {RoomPage}> */}
      </Switch>
    </div>
  );
}

export default App;
