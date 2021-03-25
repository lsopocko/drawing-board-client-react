import { FunctionComponent, useEffect, useRef } from 'react';
import styled from "styled-components";
import { getScreenHeight, getScreenWidth } from '../screen/Screen';
import { Client } from '../api/Client';

interface BoardProps {
    className?: string;
}

const brushDiameter = 7;

const client = new Client();

const Board: FunctionComponent<BoardProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const screenWidth = getScreenWidth();
    const screenHeight = getScreenHeight();

    useEffect(() => {
      let mouseDown: boolean = false;
      let context2d = canvasRef.current?.getContext('2d');
      let xLast: number = 0;
      let yLast: number = 0;
      let x: number = 0;
      let y: number = 0;
      client.login();
      client.subscribeDraw((ar: any) => {
        console.log('draw', ar)
      })

      const draw = (x: number, y: number) => {
        if (!context2d) return;

        context2d.fillStyle = "rgba(255,255,255,0.5)";
        context2d.lineWidth = brushDiameter;
        context2d.lineCap = "round";
        context2d.strokeStyle = 'rgba(255, 255, 255,'+(0.4+Math.random()*0.2)+')';
        context2d.beginPath();
        context2d.moveTo(xLast, yLast);
        context2d.lineTo(x, y);
        context2d.stroke();

        const length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
        const xUnit = (x-xLast)/length;
        const yUnit = (y-yLast)/length;

        for(let i=0; i<length; i++ ){
          const xCurrent = xLast+(i*xUnit);
          const yCurrent = yLast+(i*yUnit);
          const xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;
          const yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
          context2d.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
        }

        xLast = x;
        yLast = y;
      };

      const handleMouseMove = (e: MouseEvent) => {
        x = e.pageX;
        y = e.pageY;

        if (mouseDown) {
          client.draw(x, y, xLast, yLast);
          draw(x, y);
        }
      };

      const storeLast = (e: MouseEvent) => {
        mouseDown = true;
        xLast = e.pageX;
        yLast = e.pageY;
      };

      const release = (e: MouseEvent) => {
        mouseDown = false;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', storeLast);
      document.addEventListener('mouseup', release);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', storeLast);
        document.removeEventListener('mouseup', release);
        client.disconnect();
      };
    }, []);

  return (
    <canvas className={className} ref={canvasRef} width={screenWidth} height={screenHeight}></canvas>
  );
}

const StyledBoard = styled(Board)`
    background: #ff0000;
    z-index: 1;
    cursor: none;
    background: url(/bg.png);
`;

export default StyledBoard;
