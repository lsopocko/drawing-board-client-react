import { useState } from 'react';
import ApiClient from './api/Client';
import Board from './board/Board';
import Splash from './user/Splash';
import UsersList from './user/UsersList';

function App() {
  let [userName, setUserName] = useState('');
  let [userColor, setUserColor] = useState('');
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSetUser = async (login: string, color: string) => {
    setUserName(login);
    setUserColor(color);


    await ApiClient.login(login, color);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
        {isLoggedIn && <Board color={userColor}/>}
        {isLoggedIn && <UsersList/>}
        {!isLoggedIn && <Splash setUser={handleSetUser}></Splash>}
    </div>
  );
}

export default App;
