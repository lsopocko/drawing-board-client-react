import socketClient  from "socket.io-client";
const SERVER = "ws://localhost:3000";

class Client {
  private static instance: Client;
  private socket?: SocketIOClient.Socket;
  private id?: string;

  private constructor() {
    this.connect();
  }

  static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }

    return Client.instance;
  }

  public async login(username: string, color: string, roomId?: string): Promise<string> {
    return fetch('http://localhost:3000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, color: color, clientId: this.id, roomId: roomId }),
    })
    .then(response => response.json())
    .then(data => {
      return data.roomId;
    })
  }

  public async getUsers(): Promise<any[]> {
    return fetch('http://localhost:3000/users/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
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
    return new Promise((resolve, reject) => {
      this.socket = socketClient(SERVER, { transports: ['websocket']} );

      this.socket.on('connect', () => {
        this.id = this.socket?.id;
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