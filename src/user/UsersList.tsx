import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from "styled-components";
import ApiClient from '../api/Client';
import { DrawLineParams } from '../screen/DrawLine';
import debounce from 'debounce';

interface UsersListProps {
    className?: string;
}

interface User {
  name: string;
  color: string;
  clientId: string;
}

interface RoomParams {
  roomId: string;
}



const UsersList: FunctionComponent<UsersListProps> = ({ className }) => {
    const [userList, setUserList] = useState<User[]>([]);
    const [drawingUsers, setDrawingUsers] = useState<string[]>([]);
    let { roomId } = useParams<RoomParams>();
    const debounceClearIsDrawing = useCallback(debounce(clearIsDrawing, 1000), []);

    const isDrawing = (clientId: string) => {
      return drawingUsers.indexOf(clientId) !== -1;
    }

    function clearIsDrawing(clientId: string) {
      const index = drawingUsers.indexOf(clientId);
      const clearDrawingUsers = drawingUsers.slice().splice(index, 1);
      console.log('clearDrawingUsers', clearDrawingUsers);
      setDrawingUsers(clearDrawingUsers)
    }

    useEffect(() => {
      ApiClient.subscribeUsers(({users}: any) => {
        setUserList(users);
      });

      ApiClient.subscribeDraw(({user}: DrawLineParams) => {
        setDrawingUsers([...drawingUsers, user.clientId]);
        debounceClearIsDrawing(user.clientId);
      });

      ApiClient.getUsers()
        .then((users) => {
          setUserList(users);
        })


      return () => {
        // cleanup
      };
    }, []);

    const usersList = userList.map((user) =>
      <li style={{color: `rgba(${user.color})`}} className={isDrawing(user.clientId) ? 'is-writing' : ''} key={user.clientId}>
        {user.name}
      </li>
    );

  return (
    <ul className={className}>
      {usersList}
    </ul>
  );
}

const StyledUsersList = styled(UsersList)`
  position: fixed;
  right: 10px;
  top: 10px;
  margin:0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;

  li {
    font-weight: bold;
    opacity: 1;
    &.is-writing {
      animation: 1s blink infinite .3333s;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0.4;
    }
  }
`;

export default StyledUsersList;
