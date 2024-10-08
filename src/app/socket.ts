import { config } from "@/config/config";
import { io, Socket } from "socket.io-client";

export const socket = io(config.SOCKET_BASE_URL, {
    autoConnect: false,
    // extraHeaders: {
    //     authorization: process.env.SOCKET_TOKEN!,
    //     secret: process.env.SOCKET_SECRET!
    // }
});

// export class SocketIo {

//     private static _socket?: Socket;

//     public static init(access_token: string, secret: string): void {
//         this._socket = io(config.SOCKET_BASE_URL, {
//             autoConnect: false,
//             extraHeaders: {
//                 authorization: access_token,
//                 secret: secret
//             }
//         });
//     }

//     public static socket(): Socket {
//         if (!this._socket) {
//             throw new Error("Socket is not initialized");
//         } else {
//             return this._socket;
//         }
//     }
// }