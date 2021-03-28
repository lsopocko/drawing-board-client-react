import { FunctionComponent, useEffect, useState } from 'react';
import styled from "styled-components";
import ApiClient from '../api/Client';

interface UsersListProps {
    className?: string;
}

interface User {
  name: string;
  color: string;
  clientId: string;
}

const UsersList: FunctionComponent<UsersListProps> = ({ className }) => {
    const [userList, setUserList] = useState<User[]>([]);

    const isWriting = true;

    useEffect(() => {
      ApiClient.subscribeUsers(({users}: any) => {
        setUserList(users);
      });


      return () => {
        // cleanup
      };
    }, []);

    const usersList = userList.map((user) =>
      <li style={{color: `rgba(${user.color})`}} className={isWriting ? 'is-writing' : ''} key={user.clientId}>
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
