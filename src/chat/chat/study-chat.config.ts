import { EStudyChatPoints } from './study-chat.enum';

export const CStudyChatConfig = {
  server: {
    sendMessage: EStudyChatPoints.SendMessage,
    deleteMessage: EStudyChatPoints.DeleteMessage,
  },
  client: {
    error: EStudyChatPoints.Error,
    message: EStudyChatPoints.Message,
    connection: EStudyChatPoints.Connection,
    deletedMessage: EStudyChatPoints.DeletedMessage,
  },
};
