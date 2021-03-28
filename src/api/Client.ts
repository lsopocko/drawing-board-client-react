import socketClient  from "socket.io-client";
const SERVER = "ws://localhost:3000";

class Client {
  private static instance: Client;
  private socket?: SocketIOClient.Socket;

  private constructor() {}

  static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }

    return Client.instance;
  }

  public async login(username: string, color: string): Promise<void> {
    if (!this.socket?.connected) {
      await this.connect();
    }
    console.log('{ name: username, color: color }', { name: username, color: color });
    this.socket?.emit('setName', { name: username, color: color });
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

  public subscribeUsers(callback: any): void {
    this.socket?.on('users', callback);
  }

  public disconnect(): void {
    if (this.socket?.connected) {
      this.socket?.disconnect();
    }
  }

  private async connect(): Promise<void> {
    console.log('connect');
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

const ApiClient = Client.getInstance();
export default ApiClient;