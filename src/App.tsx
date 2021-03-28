import { useEffect, useState } from 'react';
import Board from './board/Board';
import Splash from './user/Splash';
import UsersList from './user/UsersList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ApiClient from './api/Client';
import { DrawLineParams } from './screen/DrawLine';

function App() {
  let [userColor, setUserColor] = useState('');
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSetUser = async (login: string, color: string) => {
    setUserColor(color);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Switch>
        <Route path="/room/:roomId">
          <Board color={userColor}/>
          <UsersList/>
          {!isLoggedIn && <Splash setUser={handleSetUser} loggedIn={handleLogin}/>}
        </Route>
        <Route exact path="/">
          <Splash setUser={handleSetUser} loggedIn={handleLogin}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
