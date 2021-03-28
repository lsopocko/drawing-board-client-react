export const brushDiameter = 7;

export interface DrawLineParams {
  x: number;
  y: number;
  xLast: number;
  yLast: number;
  user: {
    color: string;
    name: string;
  }
}

export function drawLine(x: number, y: number, xLast: number, yLast: number, color: string, context2d?: CanvasRenderingContext2D | null): void {
  if (!context2d) return;

  context2d.fillStyle = "rgba(255,255,255,0.5)";
  context2d.lineWidth = brushDiameter;
  context2d.lineCap = "round";
  context2d.strokeStyle = `rgba(${color}, ${(0.4+Math.random()*0.2)})`;
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
};