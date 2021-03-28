import { FunctionComponent, useEffect, useRef } from 'react';
import styled from "styled-components";
import { getScreenHeight, getScreenWidth } from '../screen/Screen';
import ApiClient from '../api/Client';
import { drawLine, DrawLineParams } from '../screen/DrawLine';

interface BoardProps {
    className?: string;
    color: string;
}

const Board: FunctionComponent<BoardProps> = ({ className, color }) => {
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
      ApiClient.subscribeDraw(({x, y, xLast, yLast, user}: DrawLineParams) => {
        drawLine(x, y, xLast, yLast, user.color, context2d);
      });

      const handleMouseMove = (e: MouseEvent) => {
        x = e.pageX;
        y = e.pageY;

        if (mouseDown) {
          ApiClient.draw(x, y, xLast, yLast);
          drawLine(x, y, xLast, yLast, color, context2d);
          xLast = x;
          yLast = y;
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
      };
    }, [color]);

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
