import { Socket } from 'socket.io';

export type JwtSocketType = Socket & { jwtData: any };
