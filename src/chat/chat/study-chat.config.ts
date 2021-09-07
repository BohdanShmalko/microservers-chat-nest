import { EStudyChatPoints } from './study-chat.enum';

export const CStudyChatConfig = {
  server: {
    sendMessage: EStudyChatPoints.ServerSendMessage,
    deleteMessage: EStudyChatPoints.ServerDeleteMessage,
    updateMessage: EStudyChatPoints.ServerUpdateMessage,
  },
  client: {
    error: EStudyChatPoints.ClientError,
    message: EStudyChatPoints.ClientMessage,
    connection: EStudyChatPoints.ClientConnection,
    deleteMessage: EStudyChatPoints.ClientDeleteMessage,
    join: EStudyChatPoints.ClientJoin,
    leave: EStudyChatPoints.ClientLeave,
    updateMessage: EStudyChatPoints.ClientUpdate,
  },
};
