import { ChangeEventHandler, FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from "styled-components";
import ApiClient from '../api/Client';
import { getRandomColor, hexToRgb } from '../color';

interface SplashProps {
    className?: string;
    setUser: any;
    loggedIn: any;
}

interface RoomParams {
  roomId: string;
}

const Splash: FunctionComponent<SplashProps> = ({ className, setUser, loggedIn }) => {
  let randomColor = getRandomColor();
  let userName: string = '';
  let userColor: string = hexToRgb(randomColor);
  let history = useHistory();
  let { roomId } = useParams<RoomParams>();

  const handleUserNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    userName = event.target.value;
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    userColor = hexToRgb(event.target.value);
  };

  const handleSubmit = async () => {
    setUser(userName, userColor);
    if (roomId) {
      await ApiClient.login(userName, userColor, roomId);
    } else {
      const roomId = await ApiClient.login(userName, userColor);
      history.push(`/room/${roomId}`);
    }
    loggedIn();
  };

  return (
    <div className={className}>
      <div className="wrapper">
        <h3>Join drawing board!</h3>
        <input type="text" onChange={handleUserNameChange} defaultValue="" placeholder="Your name"/>
        <input type="color" onChange={handleColorChange} defaultValue={randomColor} placeholder="Color"/>
        <button onClick={handleSubmit}>Enter</button>
      </div>
    </div>
  );
}

const StyledSplash = styled(Splash)`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    width: 240px;

    h3 {
      color: #fff;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 15px;
      margin: 0;
      margin-bottom: 10px;
      text-align: center;
    }

    input[type="text"] {
      width: 180px;
      border: 1px solid #cacaca;
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      border-radius: 0;
      vertical-align: top;

      &:focus,
      &:active {
        outline: 0;
      }
    }
    input[type="color"] {
      border: 1px solid #cacaca;
      height: 30px;
      padding: 0;
      border-radius: 0;
      cursor: pointer;

      &::-webkit-color-swatch-wrapper {
        padding: 0;
        border: none;
      }
      &::-webkit-color-swatch {
        border: none;
      }

      &:focus,
      &:active {
        outline: 0;
      }
    }
    button {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: none;
      color: #fff;
      padding: 0;
      background: #003C61;
      cursor: pointer;
      transition: background .3s ease-in-out;

      &:hover {
        background: #0071B8;
      }
      &:focus,
      &:active {
        outline: 0;
      }
    }
  }
`;

export default StyledSplash;
