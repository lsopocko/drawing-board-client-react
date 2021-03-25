import socketClient  from "socket.io-client";
const SERVER = "ws://localhost:3000";

export class Client {
  private socket?: SocketIOClient.Socket;

  public async login(): Promise<void> {
    if (!this.socket?.connected) {
      await this.connect();
    }

    this.socket?.emit('setName', { name: 'asd', color: '255, 255, 255'});
  }

  public async draw(x: number, y: number, xLast: number, yLast: number): Promise<void> {
    if (!this.socket?.connected) {
      await this.connect();
    }

    this.socket?.emit('draw', { x, y, xLast, yLast });
  }

  public subscribeDraw(callback: any): void {
    this.socket?.on('draw', callback);
  }

  public disconnect(): void {
    if (this.socket?.connected) {
      this.socket?.disconnect();
    }
  }

  private async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = socketClient(SERVER, { transports: ['websocket']} );

      this.socket.on('connect', () => {
        resolve()
      });

      this.socket.on("connect_error", (error: any) => {
        reject(error);
      });
    });
  }
}