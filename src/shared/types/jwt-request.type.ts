export { Request } from 'express';

export type JwtRequestType = Request & { jwtData: any };
