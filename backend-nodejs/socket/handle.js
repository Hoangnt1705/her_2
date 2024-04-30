import { SOCKET_URL } from '../constant.js';
import { io } from 'socket.io-client';
export const pyIo = io(SOCKET_URL, { reconnection: true, transports: ['websocket', 'polling'] });

export const EVENT = {
    connection: 'connection',
    addSession: 'add-session',
    send: 'send',
    receive: 'receive',
    disconnect: 'disconnect'
}
