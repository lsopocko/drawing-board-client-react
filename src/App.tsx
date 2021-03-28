import { useState } from 'react';
import ApiClient from './api/Client';
import Board from './board/Board';
import Chalk from './chalk/Chalk';
import Splash from './user/Splash';

function App() {
  let [userName, setUserName] = useState('');
  let [userColor, setUserColor] = useState('');
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSetUser = (login: string, userColor: string) => {
    setUserName(login);
    setUserColor(userColor);
    setIsLoggedIn(true)

    ApiClient.login(userName, userColor);
  };

  return (
    <div className="App">
        {isLoggedIn && <Board color={userColor}/>}
        {isLoggedIn && <Chalk/>}
        {!isLoggedIn && <Splash setUser={handleSetUser}></Splash>}
    </div>
  );
}

export default App;
