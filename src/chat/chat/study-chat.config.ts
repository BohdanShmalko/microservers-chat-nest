import { EStudyChatPoints } from './study-chat.enum';

export const CStudyChatConfig = {
  server: {
    sendMessage: EStudyChatPoints.ServerSendMessage,
    deleteMessage: EStudyChatPoints.ServerDeleteMessage,
    updateMessage: EStudyChatPoints.ServerUpdateMessage,
    createRoom: EStudyChatPoints.ServerCreateRoom,
    startWriting: EStudyChatPoints.ServerStartWriting,
    stopWriting: EStudyChatPoints.ServerStopWriting,
    readMessages: EStudyChatPoints.ServerReadMessage,
    joinRoom: EStudyChatPoints.ServerJoinRoom,
    deleteRoom: EStudyChatPoints.ServerDeleteRoom,
  },
  client: {
    error: EStudyChatPoints.ClientError,
    message: EStudyChatPoints.ClientMessage,
    connection: EStudyChatPoints.ClientConnection,
    deleteMessage: EStudyChatPoints.ClientDeleteMessage,
    join: EStudyChatPoints.ClientJoin,
    leave: EStudyChatPoints.ClientLeave,
    updateMessage: EStudyChatPoints.ClientUpdate,
    createRoom: EStudyChatPoints.ClientCreateRoom,
    startWriting: EStudyChatPoints.ClientStartWriting,
    stopWriting: EStudyChatPoints.ClientStopWriting,
    readMessages: EStudyChatPoints.ClientReadMessage,
    deleteRoom: EStudyChatPoints.ClientDeleteRoom,
  },
};
