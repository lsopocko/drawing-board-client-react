import { ChangeEventHandler, FunctionComponent } from 'react';
import styled from "styled-components";
import { hexToRgb } from '../color/hexToRgb';

interface SplashProps {
    className?: string;
    setUser: any;
}

const Splash: FunctionComponent<SplashProps> = ({ className, setUser }) => {
  let userName: string = '';
  let userColor: string = '';

  const handleUserNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    userName = event.target.value;
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    userColor = hexToRgb(event.target.value);
  };

  const handleSubmit = () => {
    setUser(userName, userColor);
  };

  return (
    <div className={className}>
      <div className="wrapper">
        <input type="text" onChange={handleUserNameChange} defaultValue="" placeholder="Your name"/>
        <input type="color" onChange={handleColorChange} defaultValue="" />
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
