import { db } from '../services/database.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const messageController = {
  getMessages: async (req, res) => {
    try {
      const messages = db.getCollection('messages');
      return sendSuccess(res, messages);
    } catch (err) {
      return sendError(res, 'Failed to fetch team conversations', 500, err.message);
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { text, senderId, senderName } = req.body;

      if (!text) {
        return sendError(res, 'Message text is required', 400);
      }

      const conv = db.findById('messages', conversationId);
      if (!conv) {
        return sendError(res, 'Conversation not found', 404);
      }

      const newMsg = {
        id: Date.now().toString(),
        senderId: senderId || req.user?.id || 'TDS001',
        senderName: senderName || req.user?.name || 'Tensora Team Member',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const chatHistory = conv.chatHistory || [];
      chatHistory.push(newMsg);

      const updated = db.update('messages', conversationId, {
        chatHistory,
        lastMessage: text,
        lastTime: 'Just now'
      });

      return sendSuccess(res, { message: newMsg, conversation: updated }, 'Message sent');
    } catch (err) {
      return sendError(res, 'Failed to send message', 500, err.message);
    }
  },

  createConversation: async (req, res) => {
    try {
      const { title, participants, initialMessage } = req.body;

      const newConv = {
        id: `CONV-${Date.now().toString().slice(-3)}`,
        title: title || 'New Channel',
        participants: Array.isArray(participants) ? participants : ['ADM-001'],
        lastMessage: initialMessage || 'Conversation started',
        lastTime: 'Just now',
        chatHistory: initialMessage
          ? [
              {
                id: Date.now().toString(),
                senderId: req.user?.id || 'ADM-001',
                senderName: req.user?.name || 'Admin',
                text: initialMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          : []
      };

      db.insert('messages', newConv);
      return sendSuccess(res, newConv, 'Conversation created', 201);
    } catch (err) {
      return sendError(res, 'Failed to create conversation', 500, err.message);
    }
  }
};
