import { FunctionComponent, useEffect, useRef } from 'react';
import styled from "styled-components";
import { getScreenHeight, getScreenWidth } from '../screen/Screen';

interface ChalkProps {
    className?: string;
}

const screenWidth = getScreenWidth();
const screenHeight = getScreenHeight();

const Chalk: FunctionComponent<ChalkProps> = ({ className }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const brushDiameter = 7;

  useEffect(() => {
    const moveChalk = (e: MouseEvent) => {
      if (spanRef.current) {
        if(e.pageX < screenWidth && e.pageY < screenHeight){
          spanRef.current.style.left = (e.pageX-0.5*brushDiameter)+'px';
          spanRef.current.style.top = (e.pageY-0.5*brushDiameter)+'px';
        }else{
          spanRef.current.style.top = (screenHeight-10)+'px';
        }
      }
    }

    document.addEventListener('mousemove', moveChalk);

    return () => {
      document.removeEventListener('mousemove', moveChalk);
    };
  }, []);

  return (
    <span ref={spanRef} className={className}>
        <span className="author-name is-hidden"></span>
    </span>
  );
}

const StyledChalk = styled(Chalk)`
    width: 40px;
    height: 50px;
    background: url(https://raw.github.com/mmoustafa/Chalkboard/master/img/chalk.png);
    position: absolute;
    padding: 0;
    margin: 0;
    bottom: 0;
    left: 0;
    cursor: none;
    z-index: 2;

    .author-name {
        background: rgba(255, 255, 255, 0.9);
        border: #000;
        padding: 3px;
        font-size: 10px;
        font-weight: bold;
        color: #3d3d3d;
        left: 20px;
        top: -12px;
        position: absolute;
    }

    .author-name.is-hidden {
        display: none;
    }
`;

export default StyledChalk;
